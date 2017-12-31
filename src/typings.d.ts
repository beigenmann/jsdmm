/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module "*.config.json" {
  const device: [{name:string}];
  export default device;
}
