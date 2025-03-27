def decode_unicode_file(file_path, encoding='utf-8'):
    try:
        # Open the file with the specified encoding
        with open(file_path, mode='r', encoding=encoding) as file:
            # Read the content of the file
            content = file.read()
            content.encode().decode('unicode-escape')
            return content
    except UnicodeDecodeError as e:
        print(f"Error decoding file: {e}")
        return None
    except FileNotFoundError:
        print("File not found.")
        return None

# Example usage
file_path = r'hackaviz_participants.json'  # Remplacez par le chemin de votre fichier
decoded_content = decode_unicode_file(file_path)

if decoded_content:
    print("Contenu du fichier décodé :")
    print(decoded_content)