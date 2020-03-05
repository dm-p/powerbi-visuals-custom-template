// Power BI API Dependencies
    import 'core-js/stable';
    import './../style/visual.less';
    import powerbi from 'powerbi-visuals-api';
    import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
    import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
    import IVisual = powerbi.extensibility.visual.IVisual;
    import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
    import VisualObjectInstance = powerbi.VisualObjectInstance;
    import DataView = powerbi.DataView;
    import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;
    import IVisualEventService = powerbi.extensibility.IVisualEventService;
    import ILocalizationManager = powerbi.extensibility.ILocalizationManager;

// Internal Dependencies
    import { VisualSettings } from "./VisualSettings";

    export class Visual implements IVisual {
        // The root element for the entire visual
            private container: HTMLElement;
        // Visual host services
            private host: IVisualHost;
        // Parsed visual settings
            private settings: VisualSettings;
        // Handle rendering events
            private events: IVisualEventService;
        // Handle localisation of visual text
            private localisationManager: ILocalizationManager;

        // Runs when the visual is initialised
            constructor(options: VisualConstructorOptions) {
                console.log('Visual constructor', options);
                this.container = options.element;
                this.host = options.host;
                this.localisationManager = this.host.createLocalizationManager();
                this.events = this.host.eventService;
            }

        // Runs when data roles added or something changes
            public update(options: VisualUpdateOptions) {

                // Handle main update flow
                    try {

                        // Signal we've begun rendering
                            this.events.renderingStarted(options);
                            console.log('Visual update', options);

                        // Parse the settings for use in the visual
                            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);

                        // Signal that we've finished rendering
                            this.events.renderingFinished(options);
                            console.log('Finished rendering');
                            return;

                    } catch(e) {

                        // Signal that we've encountered an error
                            this.events.renderingFailed(options, e);
                            console.log(`Rendering failed: ${e}`);

                    }

            }

            private static parseSettings(dataView: DataView): VisualSettings {
                return VisualSettings.parse(dataView);
            }

        /**
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         *
         */
            public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
                return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
            }
    }