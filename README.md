# asset-renderer-sample

Description:
This is a sample project for asset visualization. The project uses graphicsmagick, imagemagick, and sharp to render assets on a web page.

## Installation
To install the project, follow these steps:

Clone the project repository to your local computer.
Run the command npm install to install project dependencies.

pls check install-im-{{u-system}}.txt file for install graphicsmagick and imagemagick on u computer.

rename .env copy file to .env
Run the command npm start to start a local server and view the project in a browser by url http://localhost:3000/avatar/1 or http://localhost:3000/item/1.
## How to use?

    In this step, we use sharp to create a square and add text asset filter to it. We apply parameters that we pass in the URL string to this square, which are height and width. An example of such URL is http://localhost:3000/avatar/200?width=500&height=500.

# Explanation of how we extract data for our asset.
    In order to have dynamic data for our item or avatar, we use the library "totem-dna-parser": "github:Totem-gdn/totem-dna-parser", which parses, or converts JSON filter + asset payment hash into an object with keys and data based on the rules we wrote in the JSON file. A detailed description of this functionality can be found in the helpers/dna-parser.js file.

    In most cases, we do not modify that file. There are separate cases where we need to write additional logic for a specific renderer, but this is all done as needed.

# What routes do we have?
    We have two routes, one for item and one for avatar:
    http://localhost:3000/avatar/1?width=500&height=500
    http://localhost:3000/item/1?width=500&height=500

    They are defined in the routes/index.js file.
    For each type, there is a separate route and function that draws and creates the asset.

# The file where the main magic of creating an image happens.
    The file is controllers/api/nft.js.

    Note: In this example, we are not using real assets. This is just an example.

    The goal is to create a square, give it a dynamic color, and add several properties from our filter inside it. Please read the comments in the file for more information. In the end, we should get a colored rectangle with text inside it.

## License
The project is licensed under the MIT license, which allows for usage, modification, and distribution of the project under certain conditions. For more information, see the LICENSE file.