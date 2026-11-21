# mod-dotnet-bot

This is the repository for the [mod-dotnet-bot.net](https://mod-dotnet-bot.net) website.

Create your own coding companion by creating your own custom coding companion by modifying the dotnet-bot.

Visit the [mod-dotnet-bot.net](https://mod-dotnet-bot.net) site to get started.

If you found a bug or want to request new parts for the dotnet-bot, submit an issue!

The source code is licensed under [MIT](LICENSE). The dotnet-bot illustrations in this repo are licensed under the [CC0 1.0 Universal license](https://creativecommons.org/publicdomain/zero/1.0/).

## Installation

1. Clone repo: `git clone https://github.com/dotnet-foundation/mod-dotnet-bot.git [your-project-folder]`
2. Install jekyll: `bundle install`
3. Install npm dependencies: `npm install`
4. Start jekyll: `bundle exec jekyll serve`
5. Site should be accessible at `http://127.0.0.1:4000`

## Adding New Objects

Before you add objects, understand the structure: each object is an SVG file with 
metadata. You'll prepare the SVG first, then add it to the repo.

### Step 1: Prepare Your SVG

This is important and easy to mess up, so do this first:

1. In your design tool (Illustrator, Inkscape, Figma, etc.), select all elements 
   in your SVG
2. Group them together (Ctrl+G / Cmd+G)
3. Export/save the SVG with these settings:
   - CSS Properties → Set to "Presentation Attributes" 
   - This ensures the styling exports correctly
4. Save the file with a simple name (e.g., `antenna.svg`)

If you skip this, the SVG might not render correctly in the bot.

### Step 2: Add Your SVG Files

1. Create a folder for your object category if it doesn't exist:
   `objects > [desired-category]` (for example: `objects > antenna`)
2. Add your prepared SVG file to this folder
3. In the same folder, create an `icons` subfolder
4. Add a small icon version of your SVG to `objects > [category] > icons`

### Step 3: Register Your Object

Create or update the YAML metadata file for your category.

**File location:** `_data > [category].yml` (for example: `_data > antenna.yml`)

**File format:**

```yaml
- title: "Object Name"
  icon: "antenna.svg"           # Icon file in objects/[category]/icons/
  file: "dotnet-bot-antenna_01.svg"  # Main SVG file in objects/[category]/
