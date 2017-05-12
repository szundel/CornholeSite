(function(PRM, $, undefined) {
    var templateFromUrlLoader = {
        loadTemplate: function (name, templateConfig, callback) {
            var lookup = window.bottle.container["htmlLookup"];
            if (templateConfig.fromUrl) {
                var fullUrl = templateConfig.fromUrl;
                var transformedUrl = lookup.path(fullUrl);
                $.get(transformedUrl, function(markupString) {
                    ko.components.defaultLoader.loadTemplate(name, markupString, callback);
                });
            } else {
                callback(null);
            }
        }
    };

    // Register it
    ko.components.loaders.unshift(templateFromUrlLoader);

    var viewModelCustomLoader = {
        loadViewModel: function (name, viewModelConfig, callback) {
            if (viewModelConfig.viaLoader) {
                var viewModelConstructor = function(params) {
                    var loader = viewModelConfig.viaLoader(ko.unwrap(params.context));
                    if (!loader.hasOwnProperty("viewModel"))
                        throw "Loader does not have the property: viewModel. This property is case sensitive";
                    return loader.viewModel;
                };

                ko.components.defaultLoader.loadViewModel(name, viewModelConstructor, callback);
            } else {
                callback(null);
            }
        }
    };

    // Register it
    ko.components.loaders.unshift(viewModelCustomLoader);
}(window.PRM = window.PRM || {}, jQuery));
