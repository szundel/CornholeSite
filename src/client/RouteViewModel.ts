///<reference="RootViewModel.ts">
module Route{
  export class RouteViewModel{
    constructor(){
      var rootModel = new Root.RootViewModel();
      Sammy("#bindingContainer",function(){
          this.get("#/cornhole", context=>{
              
          })
      });
    }

    publishTitle(){

    };
  }
}
