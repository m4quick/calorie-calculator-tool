#!/usr/bin/env python3
"""
Production-like local test server for calorie-calculator-tool
Mimics Apache/Nginx behavior for accurate testing
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 8080
DIRECTORY = "."

class ProductionHandler(http.server.SimpleHTTPRequestHandler):
    """Handle requests like production server"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add production-like headers
        self.send_header('Cache-Control', 'public, max-age=3600')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging
        print(f"[{self.log_date_time_string()}] {args[0]}")

def run_server():
    """Start production-like test server"""
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), ProductionHandler) as httpd:
        print(f"=" * 60)
        print(f"Production-like test server running")
        print(f"=" * 60)
        print(f"URL: http://localhost:{PORT}")
        print(f"Directory: {os.path.abspath(DIRECTORY)}")
        print(f"Press Ctrl+C to stop")
        print(f"=" * 60)
        print()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nShutting down...")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
