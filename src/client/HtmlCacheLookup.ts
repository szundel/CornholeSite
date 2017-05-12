module Root {
  export class HtmlCacheLookup {
    init = () => {
      if (!this._loading)
        this._loading = $.Deferred();

      $.ajax({
        cache: false,
        dataType: "json",
        url: Root.HtmlCacheLookup.url
      }).done(data => {
        this._paths = data;
        this._loading.resolve();
      });

      return this._loading.promise();
    }

    path = (name) => {
      if (this._paths === undefined)
        throw Error("Manifest is emtpy or not loaded");
      var fullName = name;

      if (name.indexOf(".html") === -1)
        fullName += ".html";
      var path = this._paths[fullName];
      if (path === undefined)
        throw Error(`${name} is not defined in html-manifest.json. Check the manifest file for filename Case Sensitive`);
      return `/dist/html/${path}`;
    }

    public static url: string; //Needs to be set on index pages
    private _paths: JSON;
    private _loading: JQueryDeferred<{}>;
  }
}
