import board
import neopixel
from art import text2art

pixel = neopixel.NeoPixel(board.D18, 256, auto_write=False, brightness=.1)

WIDTH = 32
HEIGHT = 8

colors = {
    "red": (100, 0, 0),
    "green": (0, 100, 0),
    "blue": (0, 0, 100),
}



def build_led_matrix():
    LED_POSITIONS = []
    for x in range(WIDTH):
        column = []
        for y in range(HEIGHT):
            summanda = x if y % 2 == 0 else (WIDTH - 1) - x
            real_idx = y * WIDTH + summanda
            column.append(real_idx)
        LED_POSITIONS.append(column)
    return LED_POSITIONS


def write_word(word, color):
    led_matrix = build_led_matrix()
    color_tuple = colors.get(color, colors["blue"])
    word = text2art(word.lower(), 'ascii').split('\r\n')
    art_word = word[:-1]
    art_word = [f"{' ' * WIDTH}{row}" for row in art_word]
    art_word_length = len(art_word[0])
    for offset in range(art_word_length + 32):
        for y in range(HEIGHT):
            for x in range(WIDTH):
                letter = art_word[y][x + offset:x + offset + 1]
                if letter == "#":
                    color = color_tuple
                else:
                    color = (0, 0, 0)
                pixel[led_matrix[x][y]] = color
        pixel.show()


def clean_all():
    for x in range(HEIGHT * WIDTH):
        pixel[x] = (0, 0, 0)
        pixel.show()

