module Root{
  export class BaseViewModel{
    knockoutSubscriptions: KnockoutSubscription[];
    constructor(){
      this.knockoutSubscriptions = [];
    }
    dispose(){
      this.knockoutSubscriptions.forEach((sub)=>{
        sub.dispose();
      });
    }
  }
}
