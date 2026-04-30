#!/usr/bin/env python3
"""Launcher: serves the project root over HTTP and opens the version picker.

v0 is a static site that uses fetch() to load JSON, which browsers block over
file://. This script serves the project root so v0/site/index.html works, and
gives v1~v3 a place to plug in their own services as they come online.
"""
import http.server
import os
import socketserver
import sys
import webbrowser

PORT = 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


def main() -> int:
    os.chdir(ROOT)
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        url = f"http://localhost:{PORT}/"
        print(f"Serving {ROOT} at {url}")
        print("Press Ctrl+C to stop.")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
