interface KnockoutBindingHandlers {
  lazyTemplate: KnockoutBindingHandler;
}
ko.bindingHandlers.lazyTemplate = {
    init(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var values = valueAccessor();
        if (!values.name)
            throw Error("Name property is required");

        var name = getTemplate(ko.utils.unwrapObservable(values.name));

        var templateBindings = allBindings()["lazyTemplate"];

        templateBindings["name"] = name;

        var obj = ko.observable(templateBindings);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            // This will be called when the element is removed by Knockout or
            // if some other part of your code calls ko.removeNode(element)
            if (viewModel.dispose)
                viewModel.dispose();
        });

        return ko.bindingHandlers.template.init(element, obj);
    },
    update(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var values = valueAccessor();
        if (!values.name)
            throw Error("Name property is required");

        var name = getTemplate(ko.utils.unwrapObservable(values.name));

        var templateBindings = allBindings()["lazyTemplate"];

        templateBindings["name"] = name;

        var obj = ko.observable(templateBindings);

        return ko.bindingHandlers.template.update(element, obj, allBindings, viewModel, bindingContext);
    }
};

var templatePrefix = "ko-lazy-";
var getTemplate = (name) => () => {
    var lookup = (<any>window).bottle.container["htmlLookup"];
    var fileName = name;

    if (fileName.indexOf(".html") === -1)
        fileName += ".html";

    var loaded = ko.observable(false),
        templateId = templatePrefix + fileName,
        template = document.getElementById(templateId);

    if (template) {
        loaded(true);
    } else {
        jQuery.get(lookup.path(`views/${fileName}`), (data) => {
            var scriptTag = document.createElement("script"),
                head = document.getElementsByTagName("head")[0];
            scriptTag.id = templateId;
            scriptTag.type = "text/html";
            scriptTag.innerHTML = data;

            head.appendChild(scriptTag);
            loaded(true);
            PubSub.publish("Template_Loaded", name);
        });
    }

    return ko.computed(() => {
        if (loaded()) {
            return templateId;
        } else {
            return templatePrefix + "empty";
        }
    })();
};
ko.virtualElements.allowedBindings["lazyTemplate"] = true;
