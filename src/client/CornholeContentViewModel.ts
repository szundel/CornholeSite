module Cornhole {
  export class CornholeContentViewModel {
    name: KnockoutObservable<string>;
    title:string;
    willAttend: KnockoutObservable<boolean>;
    willPlay: KnockoutObservable<boolean>;

    constructor() {
      this.title = "Cornhole Sign Up"
      this.name = ko.observable("").extend({
        required: {
          params: true,
          message: "Name is required"
        }
      });
      this.willPlay = ko.observable(false);
      this.willAttend = ko.observable(false);
    }

    submit(){
      console.log("Ajax call");
      console.log(this.name(), this.willPlay(), this.willAttend());
    }
  }
}
