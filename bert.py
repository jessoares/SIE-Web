from keybert import KeyBERT

# Initialize the KeyBERT model
model = KeyBERT('distilbert-base-nli-mean-tokens')

# Example text
text = """BLAME! is a notable manga series by Tsutomu Nihei, recognized for its unique blend of genres and distinct style. The primary genres associated with BLAME! are:
Science Fiction (Sci-Fi): The manga is set in a vast, dystopian megastructure, featuring advanced technology, cybernetic enhancements, and a complex, futuristic world.
Cyberpunk: It incorporates classic cyberpunk elements like a decaying urban environment, cybernetic beings, and the merging of man and machine.
Action: The series features numerous intense and dynamic action sequences, often involving battles with various hostile entities.
Dystopian: The setting is a massive, seemingly endless structure where society has collapsed, and chaos reigns.
Horror: There are horror elements, with dark, eerie atmospheres, and grotesque creatures contributing to the unsettling tone of the series.
Mystery: The story unfolds gradually, revealing secrets about the protagonist, the megastructure, and the nature of the world they inhabit.
BLAME! is known for its minimal dialogue and intricate artwork, which enhances its mysterious and immersive atmosphere."""

# Replace hyphens with underscores
processed_text = text.replace("-", "_")

# Extract keywords
keywords = model.extract_keywords(processed_text, top_n=10)

# Revert underscores back to hyphens in the extracted keywords
processed_keywords = [(word.replace("_", "-"), score) for word, score in keywords]

# Print the keywords
print("Keywords:")
for keyword in processed_keywords:
    print(keyword)