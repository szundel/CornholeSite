///<reference="RootViewModel.ts">
module Route{
  export class RouteViewModel{
    loadedPages: any[];
    templatePrefix: string;
    constructor() {
      this.templatePrefix = "ko-lazy-";
      this.loadedPages = [];
      var rootModel = new Root.RootViewModel();
      Sammy("#bindingContainer",function(){
          this.get("#/cornhole", context=>{
              this.switchViews("cornhole.html", undefined)
          });

      });
    }
    switchViews(htmlTemplate:string, viewModel:any){
      if(htmlTemplate.indexOf(".html") === -1)
      htmlTemplate+=".html"
        $.get("/dist/views/"+htmlTemplate, (data)=>{
            var scriptTag = document.createElement("script"),
                head = document.getElementsByTagName("head")[0];
            scriptTag.id = this.templatePrefix+htmlTemplate;
            scriptTag.type = "text/html";
            scriptTag.innerHTML = data;
            head.appendChild(scriptTag);
        });
    }
    publishTitle(){

    };
  }
}
