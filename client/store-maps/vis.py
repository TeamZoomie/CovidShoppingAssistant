"""Loads and visualises a store for development"""
import matplotlib.pyplot as plt
import sys
import numpy as np


def get_colour(value):
    """Generates a random colour with a seed that makes colours consistent"""
    
    np.random.seed(value)
    colour = [np.random.uniform() for i in range(3)]
    return (tuple(colour))



def load_store(filename):
    """
    Loads a store file into a dictionary with keys as tuples (x,y) coords
    and values as the integer encoding what is there.
    """
    result = {}
    # Open file
    with open(filename, 'r') as file:
        # Read first character
        char = file.read(1)
        while char:
            # ; defines a new point
            if char == ";":
                # The next characters are of the form (x,y,e)
                char = file.read(1) # left bracket

                char = file.read(1) # x
                x = char
                char = file.read(1) # comma or second digit

                # This means x is a two digit number
                if char != ',':
                    # Add the second digit and then cast
                    x += char
                    x = int(x)
                    char = file.read(1) # Now read the comma
                else:
                    # One digit number so just cast
                    print(char)
                    x = int(x)
                
                # Follow a similar process for y and e
                char = file.read(1) # y

                y = char
                char = file.read(1) # comma or second digit
                if char != ',':
                    y += char
                    y = int(y)
                    char = file.read(1)
                else:
                    y = int(y)

                char = file.read(1) # encoded product
                e = char
                char = file.read(1)
                if char != ')':
                    e += char
                    e = int(e)
                    char = file.read(1)
                else:
                    e = int(e)
                
                # Add to the dictionary
                coords = (x,y)
                result[(x,y)] = e

            char = file.read(1)
        return result


def plot_results(store):
    """Visualises the store, colour coded by section"""
    plt.figure()
    c = 0
    for i in store.keys():
        plt.scatter(i[0], -1*i[1], color=get_colour(store[i]))
        c += 1
    plt.show()


def main(args):
    """First input argument is txt name"""
    store = load_store(args[0])
    plot_results(store)


# if __name__=='__main__':
#     main(sys.argv[1:])
