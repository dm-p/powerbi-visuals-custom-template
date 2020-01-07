# Power BI Custom Visuals Template Repository (SDK v3)

This is a template repo for a new TypeScript-based Power BI custom visual and hopefully saves a bit of time when setting up a new one from scratch.

This repo is set up for **v2.6.1** of the [`powerbi-visuals-api`](https://github.com/microsoft/PowerBI-visuals-api) and assumes you're using version **3.1** of the [`powerbi-visuals-tools`](https://github.com/microsoft/PowerBI-visuals-tools) SDK.

When we instantiate a custom visual using `pbiviz new`, the first thing I do is remove a whole bunch of stuff and set up some things I typically need each time:

* Set up a new git repo and add the SDK-specific files to the `.gitignore` file.
* Remove the boilerplate code that the template leaves in there.
* Remove boilerplate `objects` from `capabilities.json` as we typically don't need them.
* Add packages for code linting, with suggested rules for certification. I can then run `npm run lint` to check my code is formatted consistently.
* Add [powerbi-visuals-utils-formattingutils](https://github.com/microsoft/powerbi-visuals-utils-formattingutils) package so that we can do [localisation](https://microsoft.github.io/PowerBI-visuals/docs/how-to-guide/adding-localization/).
    * Add sample localisation keys to `capabilities.json`.
    * Create `stringResources/en_US/resources.resjson` with these keys, so that we can validate `en_US` localisation when we package (not currently supported in the developer visual).
* Fill out the `pbiviz.json` with some defaults so that I can run `pbiviz package` without it erroring about missing fields.
* Add [rendering events handling](https://microsoft.github.io/PowerBI-visuals/docs/how-to-guide/rendering-events/), so that we're doing the right thing if we want to work towards certification.
* Add VS Code association for `.resjson` files, for better editing localisation keys.

# Using the Repo

Once you create a new repo from this template, you need to do the following:

* Run `npm i` to ensure that all node modules are pulled down and correct.
* If you haven't installed the SDK, then you'll need to do this with `npm i -g powerbi-visuals-tools`.
* If this is the first time using the version of the SDK/API then you'll need to generate and install your certificate with `pbiviz --install-cert`.
* Update `pbiviz.json` (see below).

`pbiviz.json` contains the metadata for your custom visual. I have included enough details to allow the visual to package into a `.pbiviz` file without an error being thrown, but you should put your own mark on this.

* Update the `visual` object values:
    * Change `name` to match the desired internal name of your visual.
    * Change `displayName` to the name you wish to see in the visual palette.
    * Change `guid` to something unique. 
        * The `guid` is used by the marketplace to uniquely identify your visual, so if this happens to match then you might have problems when packaging/loading.
        * Something that combines the same value as what you add to `name`, plus a 32 character hexadecimal string matches what the SDK tool does, but you can do whatever you like here to guarantee uniqueness.
    * Change `version` to your desired number.
    * Change `description` to what you want to see when you right-click the visual and select **About**.
    * Change `supportUrl` to the site that you wish to see when you right-click the visual and select **About**. Note that this is required for packaging but doesn't necessarily have to be a legitimate site.
* Update the `author` object values:
    * Change `name` to the person or company who authors the visual.
    * Change `email` to a suitable address.