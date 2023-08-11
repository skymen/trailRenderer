function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(behInst, properties) {
      super(behInst);

      this.length = 15;
      this.lengthValue = 15;
      this.resolution = 1;
      this.widthStart = 20;
      this.widthEnd = 0;
      this.interval = 0;
      this.enabled = true;
      this.lengthIsTime = false;
      this.positions = {
        xPositions: [],
        yPositions: [],
        angles: [],
      };
      this.needsRedraw = false;
      this.needsReconstructing = true;
      this.attachedTo = null;
      this.angleTowardsNewPosition = false;

      if (properties) {
        this.lengthValue = Math.floor(Math.max(properties[0], 2));
        this.resolution = Math.floor(Math.max(properties[1], 1));
        this.widthStart = properties[2];
        this.widthEnd = properties[3];
        this.interval = Math.max(properties[4], 0);
        this.enabled = properties[5];
        this.lengthIsTime = properties[6];
      }

      this.UpdateLength();

      this.lastGameTime = -this.interval;

      this._StopTicking();
      if (this.enabled) {
        this._StartTicking2();
      }
      this.InitTrail();

      // Opt-in to getting calls to Tick()
      // this._StartTicking();
    }

    Trigger(method) {
      super.Trigger(method);
      const addonTrigger = addonTriggers.find((x) => x.method === method);
      if (addonTrigger) {
        this.GetScriptInterface().dispatchEvent(new C3.Event(addonTrigger.id));
      }
    }

    GetScriptInterfaceClass() {
      return scriptInterface;
    }

    lerp(a, b, x) {
      return (1 - x) * a + b * x;
    }

    unlerp(a, b, x) {
      return (x - a) / (b - a);
    }

    InitTrail() {
      let wi = this._inst.GetWorldInfo();
      let x = wi.GetX();
      let y = wi.GetY();
      let angle = wi.GetAngle();
      this.UpdateMesh();
      for (let i = 0; i < this.length; i++) {
        this.positions.xPositions.push(x);
        this.positions.yPositions.push(y);
        this.positions.angles.push(angle);
      }
      wi.SetSize(0, 0);
    }

    Release() {
      super.Release();
    }

    SaveToJson() {
      let keys = [
        "length",
        "resolution",
        "widthStart",
        "widthEnd",
        "positions",
        "needsRedraw",
        "needsReconstructing",
        "angleTowardsNewPosition",
      ];

      let obj = {};
      keys.forEach((key) => {
        obj[key] = this[key];
      });
      return {
        ...obj,
        attachedToUID: this._AttachedUID(),
      };
    }

    LoadFromJson(o) {
      let keys = [
        "length",
        "resolution",
        "widthStart",
        "widthEnd",
        "positions",
        "needsRedraw",
        "needsReconstructing",
        "angleTowardsNewPosition",
      ];
      // load state for savegames
      keys.forEach((key) => {
        this[key] = o[key];
      });
      let runtime = this.GetRuntime();
      let that = this;
      runtime.Dispatcher().addEventListener("afterload", () => {
        that.attachedTo = runtime.GetInstanceByUID(o.attachedToUID);
      });
    }

    _UpdateMesh() {
      this._inst
        .GetWorldInfo()
        .CreateMesh((this.length - 1) * this.resolution + 1, 2);
      this.needsReconstructing = false;
      this.needsRedraw = true;
    }

    UpdateMesh() {
      this.needsReconstructing = true;
    }

    UpdateLength() {
      let newValue;
      if (this.lengthIsTime) {
        newValue = this.lengthValue / this.interval;
      } else {
        newValue = this.lengthValue;
      }

      if (newValue !== this.length) {
        this.length = Math.floor(Math.max(newValue, 2));
        this.UpdateMesh();
      }
    }

    TrimOrExtendPositions() {
      let wi = this._IsAttached()
        ? this.attachedTo.GetWorldInfo()
        : this._inst.GetWorldInfo();
      if (this.positions.xPositions.length === 0) {
        this.positions.xPositions = [wi.GetX()];
        this.positions.yPositions = [wi.GetY()];
        this.positions.angles = [wi.GetAngle()];
      }

      for (let i = 0; i < this.length; i++) {
        if (this.positions.xPositions.length === i) {
          this.positions.xPositions.push(this.positions.xPositions[i - 1]);
          this.positions.yPositions.push(this.positions.yPositions[i - 1]);
          this.positions.angles.push(this.positions.angles[i - 1]);
        }
      }
      this.positions.xPositions = this.positions.xPositions.slice(
        0,
        this.length
      );
      this.positions.yPositions = this.positions.yPositions.slice(
        0,
        this.length
      );
      this.positions.angles = this.positions.angles.slice(0, this.length);
    }

    gradient(a, b) {
      return (b.y - a.y) / (b.x - a.x);
    }

    Tick2() {
      const wi = this._inst.GetWorldInfo();
      if (this._IsAttached()) {
        const lastGameTime = this.lastGameTime;
        const curTime = this._runtime.GetGameTime();
        let timeDiff = curTime - lastGameTime;
        const interval = this.interval;
        const attWi = this.attachedTo.GetWorldInfo();
        if (attWi === null) {
          this._Detach();
          if (this.destroyWithParent) {
            this._runtime.DestroyInstance(this._inst);
          }
        } else {
          let x = attWi.GetX();
          let y = attWi.GetY();
          if (this.attachedTo._sdkInst.GetImagePoint) {
            let ip = this.attachedTo._sdkInst.GetImagePoint(
              this.attachedToImagePoint
            );
            x = ip[0];
            y = ip[1];
          }
          if (timeDiff >= interval) {
            this.lastGameTime = curTime;
            let firstAngle = true;
            let angle = C3.toDegrees(attWi.GetAngle());
            while (timeDiff >= interval) {
              this._PushPoint(
                x,
                y,
                angle,
                firstAngle ? this.angleTowardsNewPosition : false
              );
              if (firstAngle) {
                firstAngle = false;
                angle = this._GetAngle(0);
              }
              if (interval === 0) break;
              timeDiff -= interval;
            }
          } else {
            // update the first point
            if (this.angleTowardsNewPosition) {
              this._SetPoint(
                0,
                x,
                y,
                this.angle(this._GetX(1), this._GetY(1), x, y)
              );
            } else {
              this._SetPoint(0, x, y, C3.toDegrees(attWi.GetAngle()));
            }
          }
        }
      }

      this.TrimOrExtendPositions();

      if (this.needsReconstructing) this._UpdateMesh();
      if (!this.needsRedraw) return;

      let positions = this.positions;
      let allPointPositions = [];
      var m = 0;
      var dx1 = 0;
      var dy1 = 0;
      var dx2 = 0;
      var dy2 = 0;
      for (let i = 0; i < this.length; i++) {
        // implement resolution here
        let layoutPositions = [];
        if (i > 0) {
          let preP = {
            x: positions.xPositions[i - 1],
            y: positions.yPositions[i - 1],
          };
          let curP = { x: positions.xPositions[i], y: positions.yPositions[i] };
          let nexP =
            i < this.length - 1
              ? {
                  x: positions.xPositions[i + 1],
                  y: positions.yPositions[i + 1],
                }
              : false;
          if (nexP) {
            m = 1;
            dx2 = ((nexP.x - curP.x) * -1) / 3;
            dy2 = ((nexP.y - curP.y) * -1) / 3;
          } else {
            dx2 = 0;
            dy2 = 0;
          }
          for (let j = 1; j < this.resolution; j++) {
            let progress = j / this.resolution;
            let nextPoint = this.getBezierXY(
              progress,
              preP.x,
              preP.y,
              preP.x - dx1,
              preP.y - dy1,
              curP.x + dx2,
              curP.y + dy2,
              curP.x,
              curP.y
            );
            let lerpAngle = C3.toDegrees(
              C3.angleLerp(
                C3.toRadians(positions.angles[i - 1]),
                C3.toRadians(positions.angles[i]),
                progress
              )
            );
            let widthBefore = this.lerp(
              this.widthStart / 2,
              this.widthEnd / 2,
              (i - 1) / (this.length - 1)
            );
            let widthAfter = this.lerp(
              this.widthStart / 2,
              this.widthEnd / 2,
              i / (this.length - 1)
            );
            layoutPositions.push(
              {
                x:
                  nextPoint.x +
                  Math.cos(((lerpAngle - 90) * Math.PI) / 180) *
                    this.lerp(widthBefore, widthAfter, progress),
                y:
                  nextPoint.y +
                  Math.sin(((lerpAngle - 90) * Math.PI) / 180) *
                    this.lerp(widthBefore, widthAfter, progress),
              },
              {
                x:
                  nextPoint.x +
                  Math.cos(((lerpAngle + 90) * Math.PI) / 180) *
                    this.lerp(widthBefore, widthAfter, progress),
                y:
                  nextPoint.y +
                  Math.sin(((lerpAngle + 90) * Math.PI) / 180) *
                    this.lerp(widthBefore, widthAfter, progress),
              }
            );
          }
        }
        layoutPositions.push(
          {
            x:
              positions.xPositions[i] +
              Math.cos(((positions.angles[i] - 90) * Math.PI) / 180) *
                this.lerp(
                  this.widthStart / 2,
                  this.widthEnd / 2,
                  i / (this.length - 1)
                ),
            y:
              positions.yPositions[i] +
              Math.sin(((positions.angles[i] - 90) * Math.PI) / 180) *
                this.lerp(
                  this.widthStart / 2,
                  this.widthEnd / 2,
                  i / (this.length - 1)
                ),
          },
          {
            x:
              positions.xPositions[i] +
              Math.cos(((positions.angles[i] + 90) * Math.PI) / 180) *
                this.lerp(
                  this.widthStart / 2,
                  this.widthEnd / 2,
                  i / (this.length - 1)
                ),
            y:
              positions.yPositions[i] +
              Math.sin(((positions.angles[i] + 90) * Math.PI) / 180) *
                this.lerp(
                  this.widthStart / 2,
                  this.widthEnd / 2,
                  i / (this.length - 1)
                ),
          }
        );
        //runtime.objects.Sprite.createInstance(0, layoutPositions[0].x, layoutPositions[0].y);
        //runtime.objects.Sprite.createInstance(0, layoutPositions[1].x, layoutPositions[1].y);
        allPointPositions.push(...layoutPositions);
        this.needsRedraw = false;
      }

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      allPointPositions.forEach((positions) => {
        minX = Math.min(minX, positions.x);
        minY = Math.min(minY, positions.y);
        maxX = Math.max(maxX, positions.x);
        maxY = Math.max(maxY, positions.y);
      });

      wi.SetOriginX(0.5);
      wi.SetOriginY(0.5);
      wi.SetBboxChanged();
      wi.SetXY((minX + maxX) / 2, (minY + maxY) / 2);
      wi.SetSize(maxX - minX, maxY - minY);
      wi.SetBboxChanged();

      for (let i = 0; i < (this.length - 1) * this.resolution + 1; i++) {
        wi.SetMeshPoint(i, 0, {
          mode: "absolute",
          x: this.unlerp(minX, maxX, allPointPositions[i * 2].x),
          y: this.unlerp(minY, maxY, allPointPositions[i * 2].y),
          u: -1,
          v: -1,
        });
        wi.SetMeshPoint(i, 1, {
          mode: "absolute",
          x: this.unlerp(minX, maxX, allPointPositions[i * 2 + 1].x),
          y: this.unlerp(minY, maxY, allPointPositions[i * 2 + 1].y),
          u: -1,
          v: -1,
        });
      }

      // ... code to run every tick for this behavior ...
    }

    GetDebuggerProperties() {
      return [
        {
          title: "Trail Renderer",
          properties: [
            {
              name: "$Length",
              value: this.length,
              onedit: (val) => {
                this._SetLength(parseInt(val));
              },
            },
            {
              name: "$Width Start",
              value: this.widthStart,
              onedit: (val) => {
                this._SetWidthStart(parseFloat(val));
              },
            },
            {
              name: "$Width End",
              value: this.widthEnd,
              onedit: (val) => {
                this._SetWidthEnd(parseFloat(val));
              },
            },
            {
              name: "$Resolution",
              value: this.resolution,
              onedit: (val) => {
                this._SetResolution(parseInt(val));
              },
            },
            { name: "$Positions", value: JSON.stringify(this.positions) },
          ],
        },
      ];
    }

    getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
      return {
        x:
          Math.pow(1 - t, 3) * sx +
          3 * t * Math.pow(1 - t, 2) * cp1x +
          3 * t * t * (1 - t) * cp2x +
          t * t * t * ex,
        y:
          Math.pow(1 - t, 3) * sy +
          3 * t * Math.pow(1 - t, 2) * cp1y +
          3 * t * t * (1 - t) * cp2y +
          t * t * t * ey,
      };
    }

    angle(x1, y1, x2, y2) {
      return C3.toDegrees(Math.atan2(y2 - y1, x2 - x1));
    }

    //Conditions
    _IsAttached() {
      return this.attachedTo !== null;
    }
    _CompareX(id, cmp, value) {
      return C3.compare(this._GetX(id), cmp, value);
    }
    _CompareY(id, cmp, value) {
      return C3.compare(this._GetY(id), cmp, value);
    }
    _CompareAngle(id, cmp, value) {
      return C3.compare(this._GetAngle(id), cmp, value);
    }
    _IsEnabled() {
      return this.enabled;
    }
    _LengthIsTime() {
      return this.lengthIsTime;
    }

    //Actions
    _Attach(object, angleTowardsNewPosition, imagePoint, destroyWithParent) {
      this.attachedTo = object.GetFirstPicked();
      this.angleTowardsNewPosition = angleTowardsNewPosition;
      this.attachedToImagePoint = imagePoint;
      this.destroyWithParent = destroyWithParent;
    }
    _Detach() {
      this.attachedTo = null;
    }
    _PushPoint(x, y, angle, angleTowardsNewPosition) {
      let lastX = this.positions.xPositions[0];
      let lastY = this.positions.yPositions[0];
      this.positions.xPositions.unshift(x);
      this.positions.yPositions.unshift(y);
      if (angleTowardsNewPosition) {
        angle = this.angle(lastX, lastY, x, y);
        if (isNaN(angle)) angle = 0;
      }
      this.positions.angles.unshift(angle);
      this.needsRedraw = true;
    }
    _ResetToPoint(x, y, angle) {
      this.positions.xPositions = [x];
      this.positions.yPositions = [y];
      this.positions.angles = [angle];
      this.needsRedraw = true;
    }
    _Reset() {
      this.positions.xPositions = [];
      this.positions.yPositions = [];
      this.positions.angles = [];
      this.needsRedraw = true;
    }
    _SetLength(length) {
      length = Math.floor(Math.max(length, 2));
      if (this.lengthValue === length) return;
      this.lengthValue = length;
      this.UpdateLength();
    }
    _SetResolution(resolution) {
      resolution = Math.floor(Math.max(resolution, 1));
      if (this.resolution === resolution) return;
      this.resolution = resolution;
      this.UpdateMesh();
    }
    _SetWidthStart(widthstart) {
      this.widthStart = widthstart;
      this.needsRedraw = true;
    }
    _SetWidthEnd(widthend) {
      this.widthEnd = widthend;
      this.needsRedraw = true;
    }
    _SetPoint(id, x, y, angle) {
      if (id < 0 || id >= this.length) return;
      this.positions.xPositions[id] = x;
      this.positions.yPositions[id] = y;
      this.positions.angles[id] = angle;
      this.needsRedraw = true;
    }
    _SetEnabled(enabled) {
      if (this.enabled === enabled) return;
      this.enabled = enabled;

      if (this.enabled) {
        this._StartTicking2();
        if (this._IsAttached()) {
          this._ResetToPoint(
            this.attachedTo.GetWorldInfo().GetX(this.attachedToImagePoint),
            this.attachedTo.GetWorldInfo().GetY(this.attachedToImagePoint),
            this.angleTowardsNewPosition
              ? this.attachedTo.GetWorldInfo().GetAngle()
              : 0
          );
        }
      } else {
        this._StopTicking2();
      }
    }

    _UseTimeLength(isTime) {
      if (this.lengthIsTime === isTime) return;
      this.lengthIsTime = isTime;
      this.UpdateLength();
    }

    //Expressions
    _AttachedUID() {
      return this._IsAttached() ? this.attachedTo.GetUID() : -1;
    }
    _GetX(id) {
      if (id < 0 || id >= this.length) return 0;
      return this.positions.xPositions[id];
    }
    _GetY(id) {
      if (id < 0 || id >= this.length) return 0;
      return this.positions.yPositions[id];
    }
    _GetAngle(id) {
      if (id < 0 || id >= this.length) return 0;
      return this.positions.angles[id];
    }
    _WidthStart() {
      return this.widthStart;
    }
    _WidthEnd() {
      return this.widthEnd;
    }
    _Resolution() {
      return this.resolution;
    }
    _Length() {
      return this.length;
    }
  };
}
