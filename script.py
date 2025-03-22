#!/usr/bin/env python3
import re
import sys
import os

def remove_romaji(input_filename, output_filename=None):
    # If no output filename is provided, use a default one
    if not output_filename:
        output_filename = "output.html"
    
    # Open and read the input file
    try:
        with open(input_filename, 'r', encoding='utf-8') as file:
            content = file.read()
    except FileNotFoundError:
        print(f"Error: File '{input_filename}' not found.")
        return
    except Exception as e:
        print(f"Error reading file: {e}")
        return
    
    # Pattern to match romaji that appears after 。</span><br> and ends with <br>
    # This specifically targets the <i> elements containing romaji transliteration
    pattern = r'(。</span><br>)\s*(<i>.*?</i>.*?<br>)'
    
    # Replace with just the first part to remove only the romaji part
    new_content = re.sub(pattern, r'\1', content, flags=re.DOTALL)
    
    # Count how many replacements were made
    count = len(re.findall(pattern, content, flags=re.DOTALL))
    
    # Write the cleaned content to the output file
    try:
        with open(output_filename, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Success: Removed {count} romaji segments. Cleaned content written to '{output_filename}'.")
    except Exception as e:
        print(f"Error writing to file: {e}")
        return

if __name__ == "__main__":
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python script.py input.html [output.html]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) == 3 else "output.html"
    
    remove_romaji(input_file, output_file)