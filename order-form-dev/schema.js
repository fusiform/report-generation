var application = angular.module('app');

application.controller('SchemaPreviewController', function($scope, $rootScope, $window) {
  $scope.schema = [{
      "header": "Supine Measurements",
      "body": "",
      "step_id": "medical",
      "stage_id": "supine-measurements",
      "saved": false,
      "completed": false,
      "touched": false,
      "fields": {
          "type": "object",
          "properties": {
              "Text_Axilla_Circumference": {
                  "title": "Axilla Circumference",
                  "type": "string"
              },
              "Text_Axilla_Medial_Lateral": {
                  "title": "Axilla Medial/Lateral",
                  "type": "string"
              },
              "Text_Axilla_Anterior_Posterior": {
                  "title": "Axilla Anterior/Posterior",
                  "type": "string"
              },
              "Text_Nipple_Line_Circumference": {
                  "title": "Nipple Line Circumference",
                  "type": "string"
              },
              "Text_Nipple_Line_Medial_Lateral": {
                  "title": "Nipple Line Medial/Lateral",
                  "type": "string"
              },
              "Text_Nipple_Line_Anterior_Posterior": {
                  "title": "Nipple Line Anterior/Posterior",
                  "type": "string"
              },
              "Text_Xyphoid_Circumference": {
                  "title": "Xyphoid Circumference",
                  "type": "string"
              },
              "Text_Xyphoid_Medial_Lateral": {
                  "title": "Xyphoid Medial/Lateral",
                  "type": "string"
              },
              "Text_Xyphoid_Anterior_Posterior": {
                  "title": "Xyphoid Anterior/Posterior",
                  "type": "string"
              },
              "Text_Lower_Rib_Circumference": {
                  "title": "Lower Rib Circumference",
                  "type": "string"
              },
              "Text_Lower_Rib_Medial_Lateral": {
                  "title": "Lower Rib Medial/Lateral",
                  "type": "string"
              },
              "Text_Lower_Rib_Anterior_Posterior": {
                  "title": "Lower Rib Anterior/Posterior",
                  "type": "string"
              },
              "Text_Waist_Circumference": {
                  "title": "Waist Circumference",
                  "type": "string"
              },
              "Text_Waist_Medial_Lateral": {
                  "title": "Waist Medial/Lateral",
                  "type": "string"
              },
              "Text_Waist_Anterior_Posterior": {
                  "title": "Waist Anterior/Posterior",
                  "type": "string"
              },
              "Text_Asis_Circumference": {
                  "title": "Asis Circumference",
                  "type": "string"
              },
              "Text_Asis_Medial_Lateral": {
                  "title": "Asis Medial/Lateral",
                  "type": "string"
              },
              "Text_Asis_Anterior_Posterior": {
                  "title": "Asis Anterior/Posterior",
                  "type": "string"
              },
              "Text_Trochanter_Circumference": {
                  "title": "Trochanter Circumference",
                  "type": "string"
              },
              "Text_Trochanter_Medial_Lateral": {
                  "title": "Trochanter Medial/Lateral",
                  "type": "string"
              },
              "Text_Trochanter_Anterior_Posterior": {
                  "title": "Trochanter Anterior/Posterior",
                  "type": "string"
              },
              "Text_Sternal_Notch_to_Waist": {
                  "title": "Sternal Notch to Waist",
                  "type": "string"
              },
              "Text_Xyphoid_to_Waist": {
                  "title": "Xyphoid to Waist",
                  "type": "string"
              },
              "Text_Asis": {
                  "title": "Asis",
                  "type": "string"
              },
              "Text_Sym_Pubis_to_Waist": {
                  "title": "Sym Pubis to Waist",
                  "type": "string"
              },
              "Text_Asis_to_Waist": {
                  "title": "Asis to Waist",
                  "type": "string"
              }
          },
          "required": ["Text_Axilla_Circumference", "Text_Axilla_Medial_Lateral", "Text_Axilla_Anterior_Posterior", "Text_Nipple_Line_Circumference", "Text_Nipple_Line_Medial_Lateral", "Text_Nipple_Line_Anterior_Posterior", "Text_Xyphoid_Circumference", "Text_Xyphoid_Medial_Lateral", "Text_Xyphoid_Anterior_Posterior", "Text_Lower_Rib_Circumference", "Text_Lower_Rib_Medial_Lateral", "Text_Lower_Rib_Anterior_Posterior", "Text_Waist_Circumference", "Text_Waist_Medial_Lateral", "Text_Waist_Anterior_Posterior", "Text_Asis_Circumference", "Text_Asis_Medial_Lateral", "Text_Asis_Anterior_Posterior", "Text_Trochanter_Circumference", "Text_Trochanter_Medial_Lateral", "Text_Trochanter_Anterior_Posterior", "Text_Sternal_Notch_to_Waist", "Text_Xyphoid_to_Waist", "Text_Asis", "Text_Sym_Pubis_to_Waist", "Text_Asis_to_Waist"]
      },
      "form": [
        {type: "section", htmlClass: "row", items: [
          {type: "section", htmlClass: "col-md-3", items: [
            {"key": "Text_Axilla_Circumference", "type": "input", "placeholder": "Axilla Circumference"},
            {"key": "Text_Xyphoid_Circumference", "type": "input", "placeholder": "Xyphoid Circumference"},
            {"key": "Text_Lower_Rib_Circumference", "type": "input", "placeholder": "Lower Rib Circumference"},
            {"key": "Text_Waist_Circumference", "type": "input", "placeholder": "Waist Circumference"},
            {"key": "Text_Asis_Circumference", "type": "input", "placeholder": "Asis Circumference"},
            {"key": "Text_Trochanter_Circumference", "type": "input", "placeholder": "Trochanter Circumference"},
          ]},
          {type: "section", htmlClass: "col-md-3", items: [
            {"key": "Text_Axilla_Medial_Lateral", "type": "input", "placeholder": "Axilla Medial/Lateral"},
            {"key": "Text_Nipple_Line_Medial_Lateral", "type": "input", "placeholder": "Nipple Line Medial/Lateral"},
            {"key": "Text_Xyphoid_Medial_Lateral", "type": "input", "placeholder": "Xyphoid Medial/Lateral"},
            {"key": "Text_Lower_Rib_Medial_Lateral", "type": "input", "placeholder": "Lower Rib Medial/Lateral"},
            {"key": "Text_Waist_Medial_Lateral", "type": "input", "placeholder": "Waist Medial/Lateral"},
            {"key": "Text_Asis_Medial_Lateral", "type": "input", "placeholder": "Asis Medial/Lateral"},
            {"key": "Text_Trochanter_Medial_Lateral", "type": "input", "placeholder": "Trochanter Medial/Lateral"},
          ]},
          {type: "section", htmlClass: "col-md-3", items: [
            {"key": "Text_Axilla_Anterior_Posterior", "type": "input", "placeholder": "Axilla Anterior/Posterior"},
            {"key": "Text_Xyphoid_Anterior_Posterior", "type": "input", "placeholder": "Xyphoid Anterior/Posterior"},
            {"key": "Text_Lower_Rib_Anterior_Posterior", "type": "input", "placeholder": "Lower Rib Anterior/Posterior"},
            {"key": "Text_Waist_Anterior_Posterior", "type": "input", "placeholder": "Waist Anterior/Posterior"},
            {"key": "Text_Asis_Anterior_Posterior", "type": "input", "placeholder": "Asis Anterior/Posterior"},
            {"key": "Text_Trochanter_Anterior_Posterior", "type": "input", "placeholder": "Trochanter Anterior/Posterior"},
            {"key": "Text_Nipple_Line_Anterior_Posterior", "type": "input", "placeholder": "Nipple Line Anterior/Posterior"}
          ]},
          {type: "section", htmlClass: "col-md-3", items: [
            {type: "help", helpvalue: "<h4>Image reference for measurements</h4><img src='reference_img.png'/>"}
          ]},
          {type: "section", htmlClass: "col-md-12", items: [
            {"key": "Text_Sternal_Notch_to_Waist", "type": "input", "placeholder": "Sternal Notch to Waist"},
            {"key": "Text_Xyphoid_to_Waist", "type": "input", "placeholder": "Xyphoid to Waist"},
            {"key": "Text_Asis", "type": "input", "placeholder": "Asis"},
            {"key": "Text_Sym_Pubis_to_Waist", "type": "input", "placeholder": "Sym Pubis to Waist"},
            {"key": "Text_Asis_to_Waist", "type": "input", "placeholder": "Asis to Waist"},
            {
              "type": "submit",
              "title": "Save & Continue",
              "style": "btn-succcess"
            }
          ]}
        ]}
      ],
      "model": {}
  }, {
      "header": "Prone Measurements",
      "body": "",
      "step_id": "medical",
      "stage_id": "prone-measurements",
      "saved": false,
      "completed": false,
      "touched": false,
      "fields": {
          "type": "object",
          "properties": {
              "Text_Waist_to_Axilla": {
                  "title": "Waist to Axilla",
                  "type": "string"
              },
              "Text_Trochanter_to_Waist": {
                  "title": "Trochanter to Waist",
                  "type": "string"
              },
              "Text_Waist_to_Spine_of_Scap": {
                  "title": "Waist to Spine of Scap",
                  "type": "string"
              },
              "Text_Lordosis_15_Standard_": {
                  "title": "Lordosis (15\xB0 Standard)",
                  "type": "string"
              },
              "Text_Kyphosis_10_Standard_": {
                  "title": "Kyphosis (10\xB0 Standard)",
                  "type": "string"
              }
          },
          "required": ["Text_Waist_to_Axilla", "Text_Trochanter_to_Waist", "Text_Waist_to_Spine_of_Scap"]
      },
      "form": [{
          "key": "Text_Waist_to_Axilla",
        "type": "input",
        "placeholder": "Waist to Axilla"
      }, {
          "key": "Text_Trochanter_to_Waist",
          "type": "input",
          "placeholder": "Trochanter to Waist"
      }, {
          "key": "Text_Waist_to_Spine_of_Scap",
          "type": "input",
          "placeholder": "Waist to Spine of Scap"
      }, {
          "key": "Text_Lordosis_15_Standard_",
          "type": "input",
          "placeholder": "Lordosis (15\xB0 Standard)"
      }, {
          "key": "Text_Kyphosis_10_Standard_",
          "type": "input",
          "placeholder": "Kyphosis (10\xB0 Standard)"
      }, {
          "type": "submit",
          "title": "Save & Continue",
          "style": "btn-succcess"
      }],
      "model": {}
  }, {
      "header": "Pattern Options",
      "body": "",
      "step_id": "medical",
      "stage_id": "pattern",
      "saved": false,
      "completed": false,
      "touched": false,
      "fields": {
          "type": "object",
          "properties": {
              "Select_Pattern": {
                  "title": "Pattern",
                  "type": "string",
                  "enum": ["Monsters", "Forest Friends", "Busy Bees", "Bugs", "Fairytale", "Blossom", "Traffic Soup", "White", "Peace Signs", "Construction", "Green Camo", "Yellow", "Comic Book", "Dinosaurs", "Pink Camo", "Pink", "Sports", "Farm Friends", "Happy Daisies", "Blue", "Butterflies", "Skateboard"]
              }
          },
          "required": []
      },
      "form": [{
          "key": "Select_Pattern",
          "type": "select"
      }, {
          "type": "submit",
          "title": "Save & Continue",
          "style": "btn-succcess"
      }],
      "model": {}
  }, {
      "header": "Special Modifications",
      "body": "",
      "step_id": "device",
      "stage_id": "modifications",
      "saved": false,
      "completed": false,
      "touched": false,
      "fields": {
          "type": "object",
          "properties": {
              "Select_Modifications": {
                  "title": "Modifications",
                  "type": "array",
                  "items": {
                      "type": "string",
                      "enum": ["Add Gill Modifications ($10)", "Anterior Opening", "Posterior Opening", "Anterior Cutout"]
                  }
              },
              "Text_Additional_Notes": {
                  "title": "Additional Notes",
                  "type": "string"
              }
          },
          "required": []
      },
      "form": [{
          "key": "Select_Modifications",
          "htmlClass": "form-bg"
      }, {
          "key": "Text_Additional_Notes",
          "type": "input",
          "placeholder": "Additional Notes"
      }, {
          "type": "submit",
          "title": "Save & Continue",
          "style": "btn-succcess"
      }],
      "model": {}
  }];
});
