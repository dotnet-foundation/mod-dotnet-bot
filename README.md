# Repo for the mod-dotnet-bot website
## Create your own coding companion

Coding is better with friends, especially when they bring their own mods. As the mascot for the .NET community, dotnet-bot helps with checking pull requests on .NET repos on GitHub. This repo is the source for creating your own custom coding companion by modding the dotnet-bot. 

Visit the [mod-dotnet-bot.net](https://mod-dotnet-bot.net) site to get started. 

If you found a bug or want to request new parts for the dotnet-bot, submit an issue!

The source code is licenced under [MIT](LICENSE). The dotnet-bot illustrations in this repo are licensed under the [CC0 1.0 Universal license](http://creativecommons.org/publicdomain/zero/1.0/).

## Installation

1. Clone repo: `git clone https://github.com/dotnet-foundation/mod-dotnet-bot.git [your-project-folder]`
2. Install [Jekyll](https://jekyllrb.com/): `bundle install`
3. Install npm dependencies: `npm install`
4. Start jekyll: `bundle exec jekyll serve`
5. Site should be accessible at `http://127.0.0.1:4000`

## Adding new objects

1. Add new SVGs under > objects > [desired category] (for example, antenna).
2. Add the icon for the object to the icons folder under the same object folder (for example, objects > antenna > icons).
3. Open the corresponding category .yml file that's in the \_data folder. (for example, \_data > antenna.yml)
4. Create a new block that lists the item's title, icon name, and file name (make sure these file names are an exact match of the file you added to the objects folder).

That should be it! 

> Note:
> On the SVG files, make sure all objects within the svg are grouped. So before you save an svg, do a "select all" and "group" them together.
