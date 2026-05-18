#!/usr/bin/env python3
"""
One-shot transform: wrap text fields in faq.json and schedule.json with
per-locale {zh-Hant, en} objects, seed English translations for the chosen
sample entries, and normalise `who` codes in schedule.json.

Idempotent: detects already-converted shape via type check.

This script lives in the data/ folder for transparency — it is the proof
of what was done. It can be deleted once the conversion is committed.
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).parent

# --- schedule.json ---------------------------------------------------------

# Map legacy Chinese `who` strings to canonical audience codes used by the
# renderer + tab buttons.
WHO_MAP = {
    "一般新生/轉學生": "undergrad",
    "碩/專/博班新生": "grad",
}

# English seed translations for the first batch of schedule entries.
# Keyed by the Chinese `item` value (which is stable across runs).
SCHEDULE_EN = {
    "新生基本資料登錄": {
        "item": "New student data registration",
        "time": "Before 8/22",
        "content": "Register via the New Student Data Portal. Two forms are produced: the Basic Data Form (returned to the Registrar) and the Comprehensive Data Form (returned to your department office).",
        "dept": "Registrar 50120 / 50128 (Basic Data Form); Student Affairs 50340 (Comprehensive Data Form support)",
    },
    "繳交新生資料表": {
        "item": "Submit new student forms",
        "time": "Basic Data Form: by 8/29; Comprehensive Data Form: after term starts",
        "content": "Mail or hand-deliver the Basic Data Form to the Registrar by 8/29. The Comprehensive Data Form is mailed or handed in to your department office after term starts.",
        "dept": "Registrar 50120 / 50128; Student Affairs 50340",
    },
    "註冊繳費及領取學生證": {
        "item": "Registration payment & student ID pick-up",
        "time": "8/22 – 9/8",
        "content": "Pay via Bank of Taiwan. Student IDs are handed to class representatives via the department office once term begins.",
        "dept": "Cashier 50606 / 50607; Registrar 50120 / 50128",
    },
    "宿舍申請": {
        "item": "Dormitory application",
        "time": "See announcement",
        "content": "See the New Student Zone for dormitory application details.",
        "dept": "Undergrad: Housing 86355; Grad: Housing 86340 / 86357",
    },
    "境外生": {
        "item": "Overseas students",
        "time": "Before 9/8",
        "content": "Overseas students should follow the new student handbook or arrival packet provided by this office. If you cannot arrive by 9/8, complete online registration and notify us of your arrival schedule as soon as possible.",
        "dept": "50463",
    },
    "新生體檢": {
        "item": "New student health check",
        "time": "Complete by 9/8; submit report by end of September",
        "content": "Complete your new student health check by 114/9/8 and submit the report to the Health Services office by the end of September. Incomplete reports are not accepted.",
        "dept": "50430 / 50438",
    },
    "新鮮人成長營": {
        "item": "Freshman Orientation Camp",
        "time": "9/3 – 9/5",
        "content": "See the Military Training office website for the orientation camp schedule.",
        "dept": "Military Training 50758",
    },
    "兵役": {
        "item": "Military service",
        "time": "8/1 – 9/12",
        "content": "Submit the Student Military Service Status Form by 9/12 to apply for deferral or postponement of conscription while enrolled.",
        "dept": "Student Affairs 50340",
    },
}

# --- faq.json --------------------------------------------------------------

# English seed translations for the first batch of FAQs. Keyed by `id`.
FAQ_EN = {
    "1-1": {
        "category": "Course selection",
        "question": "What if I can't enrol in my preferred second-language course?",
        "answer": "Contact the Foreign Language Center (ext. 52273) to ask about waitlist or override options.",
        "unit": "Academic Affairs · Curriculum Section",
    },
    "1-2": {
        "category": "Course selection",
        "question": "When are each semester's courses announced?",
        "answer": "September-start courses are announced around June 16. February-start courses are announced around December 16.",
        "unit": "Academic Affairs · Curriculum Section",
    },
    "1-3": {
        "category": "Course selection",
        "question": "How do inter-school / cross-institution course selection rules work, and how do I apply?",
        "answer": "https://reurl.cc/WxRZ6e",
        "unit": "Academic Affairs · Curriculum Section",
    },
    "1-4": {
        "category": "Class",
        "question": "Does the university set a unified mid-term exam date?",
        "answer": "Assessment for each course follows the instructor's syllabus. Whether there is a mid-term, and when, is set by each instructor.",
        "unit": "Academic Affairs · Curriculum Section",
    },
    "1-5": {
        "category": "Class",
        "question": "When does the semester end and the break begin?",
        "answer": "The academic calendar is published on the NCKU homepage under 'About NCKU.' General final-exam dates are listed, but each course follows the instructor's schedule.",
        "unit": "Academic Affairs · Curriculum Section",
    },
}


def localize(value, en_value=None):
    """Wrap a string in {zh-Hant, en}, or return as-is if already localised."""
    if value is None:
        return value
    if isinstance(value, dict):
        # already converted — top up English if a seed was provided and absent
        if en_value and "en" not in value:
            value["en"] = en_value
        return value
    obj = {"zh-Hant": value}
    if en_value:
        obj["en"] = en_value
    return obj


def transform_schedule():
    path = ROOT / "schedule.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    out = []
    for r in rows:
        # determine canonical audiences. Both the `who` field and a sub-string
        # mention in the content can mark an entry as applying to an audience.
        audiences = []
        content_zh = r.get("content") if isinstance(r.get("content"), str) else (
            r["content"].get("zh-Hant") if isinstance(r.get("content"), dict) else ""
        )
        legacy_who = r.get("who")
        if isinstance(legacy_who, list):
            for w in legacy_who:
                code = WHO_MAP.get(w, w) if isinstance(w, str) else w
                if code not in audiences: audiences.append(code)
        elif isinstance(legacy_who, str):
            code = WHO_MAP.get(legacy_who, legacy_who)
            if code not in audiences: audiences.append(code)
        if content_zh:
            for zh, code in WHO_MAP.items():
                if zh in content_zh and code not in audiences:
                    audiences.append(code)

        item_zh = r["item"] if isinstance(r["item"], str) else r["item"].get("zh-Hant", "")
        seed = SCHEDULE_EN.get(item_zh, {})

        new = {
            "item": localize(r["item"], seed.get("item")),
            "time": localize(r["time"], seed.get("time")),
            "content": localize(r["content"], seed.get("content")),
            "who": audiences,
            "dept": localize(r["dept"], seed.get("dept")),
        }
        out.append(new)

    path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"schedule.json: {len(out)} entries, English seeded for {sum(1 for r in rows if (r['item'] if isinstance(r['item'], str) else r['item'].get('zh-Hant', '')) in SCHEDULE_EN)} of them")


def transform_faq():
    path = ROOT / "faq.json"
    rows = json.loads(path.read_text(encoding="utf-8"))
    out = []
    for r in rows:
        seed = FAQ_EN.get(r["id"], {})
        category_zh = r["category"] if isinstance(r["category"], str) else r["category"].get("zh-Hant", "")
        new = {
            "id": r["id"],
            # categoryId is the stable Chinese code; the category dropdown uses
            # this so a switch to English keeps the active filter valid.
            "categoryId": category_zh,
            "category": localize(r["category"], seed.get("category")),
            "question": localize(r["question"], seed.get("question")),
            "answer": localize(r["answer"], seed.get("answer")),
            "unit": localize(r.get("unit"), seed.get("unit")),
            "views": r.get("views", 0),
        }
        out.append(new)
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"faq.json: {len(out)} entries, English seeded for {sum(1 for r in rows if r['id'] in FAQ_EN)} of them")


if __name__ == "__main__":
    transform_schedule()
    transform_faq()
