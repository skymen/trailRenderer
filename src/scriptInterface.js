function getScriptInterface(parentClass, map) {
  return class extends parentClass {
    constructor() {
      super();
      map.set(this, parentClass._GetInitInst().GetSdkInstance());
    }

    Attach(object, angleTowardsNewPosition, imagePoint, destroyWithParent) {
      const inst = map.get(this);
      if (object.getFirstInstance) {
        object = object.getFirstInstance();
      }
      inst.attachedTo = inst._runtime.GetInstanceByUID(object.uid);
      inst.angleTowardsNewPosition = angleTowardsNewPosition;
      inst.attachedToImagePoint = imagePoint;
      inst.destroyWithParent = destroyWithParent;
    }
  };
}
