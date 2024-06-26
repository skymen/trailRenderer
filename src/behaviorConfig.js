// WARNING: DO NOT EDIT THIS FILE, IT IS AUTOGENERATED
module.exports = {
  addonType: "behavior",
  id: "skymenTrail",
  name: "Trail Renderer",
  version: "2.0.1.1",
  category:
    // "attributes",
    // "movements",
    // "other",
    "general",
  author: "skymen",
  website: "https://www.construct.net",
  documentation: "https://www.construct.net",
  description: "A trail renderer behavior",
  // icon: "icon.svg", // defaults to "icon.svg" if omitted
  fileDependencies: [
    /*
    {
      filename: "filename.js", // no need to include "c3runtime/" prefix
      type:
        "copy-to-output"
        "inline-script"
        "external-dom-script"
        "external-runtime-script"
        "external-css"

      // for copy-to-output only
      // fileType: "image/png"
    }
    */
  ],
  info: {
    Set: {
      IsOnlyOneAllowed: true,
      CanBeBundled: true,
      IsDeprecated: false,
    },
  },
  properties: [
    /*
    {
      type:
        "integer"
        "float"
        "percent"
        "text"
        "longtext"
        "check"
        "font"
        "combo"
        "group"
        "link"
        "info"

      id: "property_id",
      options: {
        initialValue: 0,
        interpolatable: false,

        // minValue: 0, // omit to disable
        // maxValue: 100, // omit to disable

        // for type combo only
        // items: [
        //   {itemId1: "item name1" },
        //   {itemId2: "item name2" },
        // ],

        // dragSpeedMultiplier: 1, // omit to disable

        // for type link only
        // linkCallback: `function(instOrObj) {}`,
        // linkText: "Link Text",
        // callbackType:
        //   "for-each-instance"
        //   "once-for-type"

        // for type info only
        // infoCallback: `function(inst) {}`,
      },
      name: "Property Name",
      desc: "Property Description",
    }
    */
    {
      type: "float",
      id: "length",
      options: {
        initialValue: 15,
        interpolatable: false,
      },
      name: "Length",
      desc: "The length of the trail",
    },
    {
      type: "integer",
      id: "resolution",
      options: {
        initialValue: 1,
        interpolatable: false,
      },
      name: "Resolution",
      desc: "The number of mesh points per step (minimum 1)",
    },
    {
      type: "float",
      id: "width-start",
      options: {
        initialValue: 20,
        interpolatable: false,
      },
      name: "Start width",
      desc: "Start width of the trail",
    },
    {
      type: "float",
      id: "width-end",
      options: {
        initialValue: 0,
        interpolatable: false,
      },
      name: "End width",
      desc: "End width of the trail",
    },
    {
      type: "float",
      id: "interval",
      options: {
        initialValue: 0.0166666667,
        interpolatable: false,
      },
      name: "Interval",
      desc: "The interval between each step. If 0, the interval is the same as the framerate",
    },
    {
      type: "check",
      id: "enabled",
      options: {
        initialValue: true,
        interpolatable: false,
      },
      name: "Enabled",
      desc: "Whether the trail is enabled",
    },
    {
      type: "check",
      id: "length-is-time",
      options: {
        initialValue: false,
        interpolatable: false,
      },
      name: "Use Time Length",
      desc: "Whether the length is in seconds instead of number of steps",
    },
  ],
  aceCategories: {
    // follows the format id: langName
    // in the ACEs refer to categories using the id, not the name
    general: "General",
    params: "Params",
  },
  Acts: {
    /*
    SampleAction: {
      // The category of the action as it appears in the add action dialog
      category: "general",

      // Forward to the runtime function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this action
      // Cases where you might not want this are:
      // 1- If the action params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the action in the add action dialog
      highlight: true,

      // Set to true to hide the action in the interface. False by default if not specified.
      deprecated: false,

      // Marks the action as async. Defaults to false if not specified.
      isAsync: false,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the action as it appears in the add action dialog
      listName: "Sample Action",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      // You can also use the {my} tag to include the behavior icon and name.
      displayText: "{my}: Sample action [i]{0}[/i]",

      // The description of the action as it appears in the add action dialog
      description: "This is a sample action",
    },
    */
    attach: {
      category: "general",
      id: "attach",
      forward: "_Attach",
      autoScriptInterface: false,
      highlight: true,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "object",
          name: "Object",
          desc: "The object to attach to",
          type: "object",
          allowedPluginIds: [
            "Sprite",
            "TiledBackground",
            "Text",
            "9Patch",
            "Spritefont2",
            "SVGPicture",
          ],
        },
        {
          id: "angle-towards-new-position",
          name: "Angle towards new position",
          desc: "Wether the angle is set using the object's position or the object's angle",
          type: "boolean",
          value: false,
        },
        {
          id: "image-point",
          name: "Image point",
          desc: "The image point to attach to",
          type: "any",
          value: "",
        },
        {
          id: "follow-z",
          name: "Follow the Z coordinate",
          desc: "Also follow the object's Z axis",
          type: "boolean",
          value: true,
        },
        {
          id: "destroy-with-parent",
          name: "Destroy with parent",
          desc: "Automatically destroys the trail when the object it's attached to is destroyed",
          type: "boolean",
          value: false,
        },
      ],
      listName: "Attach",
      displayText:
        "{my}: Attach to {0} on image point {2} (angle towards position: {1}, follow z: {3}, destroy with parent: {4})",
      description: "Attach trail to object",
    },
    "push-point": {
      category: "general",
      id: "push-point",
      forward: "_PushPoint",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "x",
          name: "X",
          desc: "X position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "y",
          name: "Y",
          desc: "Y position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "z",
          name: "Z",
          desc: "Z position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "angle",
          name: "Angle",
          desc: "Angle of the point",
          type: "number",
          value: "0",
        },
        {
          id: "angle-towards-new-position",
          name: "Angle towards new position",
          desc: "Wether the angle is set using the object's position or the object's angle",
          type: "boolean",
          value: false,
        },
      ],

      listName: "Push point",
      displayText:
        "{my}: Push point ({0}, {1}, {2}, {3}, angle towards position: {4})",
      description: "Push a new point to the trail",
    },
    reset: {
      category: "general",
      id: "reset",
      forward: "_Reset",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [],
      listName: "Reset",
      displayText: "{my}: Reset trail",
      description: "Reset the trail",
    },
    "set-length": {
      category: "params",
      id: "set-length",
      forward: "_SetLength",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "length",
          name: "Length",
          desc: "The length of the trail",
          type: "number",
          value: "15",
        },
      ],
      listName: "Set length",
      displayText: "{my}: Set length to {0}",
      description: "Set the length of the trail",
    },
    "set-resolution": {
      category: "params",
      id: "set-resolution",
      forward: "_SetResolution",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "resolution",
          name: "Resolution",
          desc: "The resolution of the trail",
          type: "number",
          value: "1",
        },
      ],
      listName: "Set resolution",
      displayText: "{my}: Set resolution to {0}",
      description: "Set the resolution of the trail",
    },
    "set-width-start": {
      category: "params",
      id: "set-width-start",
      forward: "_SetWidthStart",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "widthstart",
          name: "Width",
          desc: "The width of the trail at the start",
          type: "number",
          value: "20",
        },
      ],
      listName: "Set Width Start",
      displayText: "{my}: Set width start to {0}",
      description: "Set the width of the trail at the start",
    },
    "set-width-end": {
      category: "params",
      id: "set-width-end",
      forward: "_SetWidthEnd",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "widthend",
          name: "Width",
          desc: "The width of the trail at the end",
          type: "number",
          value: "0",
        },
      ],
      listName: "Set Width End",
      displayText: "{my}: Set width end to {0}",
      description: "Set the width of the trail at the end",
    },
    "reset-to-point": {
      category: "general",
      id: "reset-to-point",
      forward: "_ResetToPoint",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "x",
          name: "X",
          desc: "X position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "y",
          name: "Y",
          desc: "Y position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "z",
          name: "Z",
          desc: "Z position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "angle",
          name: "Angle",
          desc: "Angle of the point",
          type: "number",
          value: "0",
        },
      ],
      listName: "Reset to point",
      displayText: "{my}: Reset to point ({0}, {1}, {2}, {3})",
      description: "Reset the trail to a point",
    },
    detach: {
      category: "general",
      id: "detach",
      forward: "_Detach",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [],
      listName: "Detach",
      displayText: "{my}: Detach trail",
      description: "Detach the trail from the object",
    },
    SetPoint: {
      category: "general",
      id: "SetPoint",
      forward: "_SetPoint",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "index",
          name: "Index",
          desc: "The index of the point to set",
          type: "number",
          value: "0",
        },
        {
          id: "x",
          name: "X",
          desc: "X position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "y",
          name: "Y",
          desc: "Y position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "z",
          name: "Z",
          desc: "Z position of the point",
          type: "number",
          value: "0",
        },
        {
          id: "angle",
          name: "Angle",
          desc: "Angle of the point",
          type: "number",
          value: "0",
        },
      ],
      listName: "Set point",
      displayText: "{my}: Set point {0} to ({1}, {2}, {3}, {4})",
      description: "Set a point in the trail",
    },
    SetEnabled: {
      category: "general",
      id: "SetEnabled",
      forward: "_SetEnabled",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "enabled",
          name: "Enabled",
          desc: "Whether the trail is enabled",
          type: "boolean",
        },
      ],
      listName: "Set enabled",
      displayText: "{my}: Set enabled to {0}",
      description: "Set whether the trail is enabled",
    },
    UseTimeLength: {
      category: "general",
      id: "UseTimeLength",
      forward: "_UseTimeLength",
      autoScriptInterface: true,
      highlight: false,
      deprecated: false,
      isAsync: false,
      params: [
        {
          id: "use",
          name: "Use",
          desc: "Whether to use time length",
          type: "boolean",
        },
      ],
      listName: "Use time length",
      displayText: "{my}: Use time length: {0}",
      description: "Set whether to use time length",
    },
  },
  Cnds: {
    /*
    SampleCondition: {
      // The category of the action as it appears in the add condition dialog
      category: "general",

      // Forward to the runtime function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this condition
      // Cases where you might not want this are:
      // 1- If the condition params are incompatible with the script interface
      // 2- If you don't want it to appear in the script interface
      // 3- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the condition in the add condition dialog
      highlight: true,

      // Set to true to hide the condition in the interface. False by default if not specified.
      deprecated: false,

      // special conditions properties. These can all be omitted, and they will default to the following values:
      isTrigger: false,
      isFakeTrigger: false,
      isStatic: false,
      isLooping: false,
      isInvertible: true,
      isCompatibleWithTriggers: true,

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
            - "boolean"

            // The following types can take a default value but CANNOT be automatically generated in the script interface
            - "combo"

            // The following types CANNOT take a default value AND CANNOT be automatically generated in the script interface
            - "cmp"
            - "object"
            - "objectname"
            - "layer"
            - "layout"
            - "keyb"
            - "instancevar"
            - "instancevarbool"
            - "eventvar"
            - "eventvarbool"
            - "animation"
            - "objinstancevar"

          // The default value of the parameter. Can be omitted if the type is not a string, number, any, boolean or combo.
          value: "the default value of the parameter",

          // Only for type "combo"
          items: [
            {"itemId1": "itemName1"},
            {"itemId2": "itemName2"},
            {"itemId3": "itemName3"},
          ],

          // Only for type "object"
          allowedPluginIds: ["Sprite", "TiledBg"],
        },
      ],

      // The name of the condition as it appears in the add condition dialog
      listName: "Sample Condition",

      // The text that appears in the event sheet. Note, every single param must be used in the display text.
      // You can also use [b] and [i] tags.
      // You can also use the {my} tag to include the behavior icon and name.
      displayText: "{my}: Sample condition [i]{0}[/i]",

      // The description of the condition as it appears in the add condition dialog
      description: "This is a sample condition",
    },
    */
    "is-attached": {
      category: "general",
      id: "is-attached",
      forward: "_IsAttached",
      autoScriptInterface: true,
      highlight: true,
      params: [],
      listName: "Is attached",
      displayText: "{my}: Is attached",
      description: "Check if the trail is attached to an object",
    },
    "compare-x": {
      category: "general",
      id: "compare-x",
      forward: "_CompareX",
      autoScriptInterface: false,
      highlight: false,
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to compare",
          type: "number",
          value: "0",
        },
        {
          id: "cmp",
          name: "Cmp",
          desc: "Compare operator",
          type: "cmp",
        },
        {
          id: "value",
          name: "Value",
          desc: "The value to compare to",
          type: "number",
          value: "0",
        },
      ],
      listName: "Compare X",
      displayText: "{my}: Point {0} X {1} {2}",
      description: "Compare the X position of a point",
    },
    "compare-y": {
      category: "general",
      id: "compare-y",
      forward: "_CompareY",
      autoScriptInterface: false,
      highlight: false,
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to compare",
          type: "number",
          value: "0",
        },
        {
          id: "cmp",
          name: "Cmp",
          desc: "Compare operator",
          type: "cmp",
        },
        {
          id: "value",
          name: "Value",
          desc: "The value to compare to",
          type: "number",
          value: "0",
        },
      ],
      listName: "Compare Y",
      displayText: "{my}: Point {0} Y {1} {2}",
      description: "Compare the Y position of a point",
    },
    CompareZ: {
      category: "general",
      forward: "_CompareZ",
      autoScriptInterface: false,
      highlight: false,
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to compare",
          type: "number",
          value: "0",
        },
        {
          id: "cmp",
          name: "Cmp",
          desc: "Compare operator",
          type: "cmp",
        },
        {
          id: "value",
          name: "Value",
          desc: "The value to compare to",
          type: "number",
          value: "0",
        },
      ],
      listName: "Compare Z",
      displayText: "{my}: Point {0} Z {1} {2}",
      description: "Compare the Z position of a point",
    },
    "compare-angle": {
      category: "general",
      id: "compare-angle",
      forward: "_CompareAngle",
      autoScriptInterface: false,
      highlight: false,
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to compare",
          type: "number",
          value: "0",
        },
        {
          id: "cmp",
          name: "Cmp",
          desc: "Compare operator",
          type: "cmp",
        },
        {
          id: "value",
          name: "Value",
          desc: "The value to compare to",
          type: "number",
          value: "0",
        },
      ],
      listName: "Compare angle",
      displayText: "{my}: Point {0} angle {1} {2}",
      description: "Compare the angle of a point",
    },
    IsEnabled: {
      category: "general",
      id: "IsEnabled",
      forward: "_IsEnabled",
      autoScriptInterface: true,
      highlight: true,
      params: [],
      listName: "Is enabled",
      displayText: "{my}: Is enabled",
      description: "Check if the trail is enabled",
    },
    LengthIsTime: {
      category: "general",
      id: "LengthIsTime",
      forward: "_LengthIsTime",
      autoScriptInterface: true,
      highlight: true,
      params: [],
      listName: "Length is time",
      displayText: "{my}: Length is time",
      description: "Check if the length is in time",
    },
  },
  Exps: {
    /*
    SampleExpression: {
      // The category of the action as it appears in the expression picker
      category: "general",

      // Forward to the runtime function name
      forward: "_SampleAction",
      // Or specify a handler function
      handler: `function () {
        // Your code here
      }`,

      // Set to true to automatically generate a script interface for this expression
      // Cases where you might not want this are:
      // 1- If you don't want it to appear in the script interface
      // 2- If the script interface has a better way to achieve the same thing
      autoScriptInterface: true,

      // Set to true to highlight the expression in the expression picker
      highlight: true,

      // Set to true to hide the expression in the interface. False by default if not specified.
      deprecated: false,

      // The type of the expression.
      returnType:
        - "string"
        - "number"
        - "any" // must be either string or number

      // Set to true if the expression is variadic. False by default if not specified.
      isVariadicParameters: false

      // list of parameters
      params: [
        {
          // The id of the parameter. This is used to generate the script interface.
          // It must be unique for each parameter.
          id: "param1",
          // The name of the parameter.
          name: "Param 1",
          // The description of the parameter.
          desc: "The first parameter",

          // The type of the parameter.
          type:
            // The following types can take a default value AND be automatically generated in the script interface
            - "string"
            - "number"
            - "any"
        },
      ],

      // The description of the expression as it appears in the expression picker
      description: "This is a sample expression",
    },
    */
    "attached-uid": {
      category: "general",
      expressionName: "AttachedUID",
      scriptName: "AttachedUID",
      forward: "_AttachedUID",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [],
      description: "Get the UID of the object the trail is attached to",
    },
    "get-x": {
      category: "params",
      expressionName: "GetX",
      scriptName: "GetX",
      forward: "_GetX",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to get",
          type: "number",
          value: "0",
        },
      ],
      description: "Get the X position of a point",
    },
    "get-y": {
      category: "params",
      expressionName: "GetY",
      scriptName: "GetY",
      forward: "_GetY",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to get",
          type: "number",
          value: "0",
        },
      ],
      description: "Get the Y position of a point",
    },
    GetZ: {
      category: "params",
      expressionName: "GetZ",
      scriptName: "GetZ",
      forward: "_GetZ",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to get",
          type: "number",
          value: "0",
        },
      ],
      description: "Get the Z position of a point",
    },
    "get-angle": {
      category: "params",
      expressionName: "GetAngle",
      scriptName: "GetAngle",
      forward: "_GetAngle",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [
        {
          id: "id",
          name: "ID",
          desc: "The id of the point to get",
          type: "number",
          value: "0",
        },
      ],
      description: "Get the angle of a point",
    },
    "width-start": {
      category: "params",
      expressionName: "WidthStart",
      scriptName: "WidthStart",
      forward: "_WidthStart",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [],
      description: "Get the width of the trail at the start",
    },
    "width-end": {
      category: "params",
      expressionName: "WidthEnd",
      scriptName: "WidthEnd",
      forward: "_WidthEnd",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [],
      description: "Get the width of the trail at the end",
    },
    resolution: {
      category: "params",
      expressionName: "Resolution",
      scriptName: "Resolution",
      forward: "_Resolution",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [],
      description: "Get the resolution of the trail",
    },
    length: {
      category: "params",
      expressionName: "Length",
      scriptName: "Length",
      forward: "_Length",
      autoScriptInterface: true,
      highlight: false,
      returnType: "number",
      params: [],
      description: "Get the length of the trail",
    },
  },
};
