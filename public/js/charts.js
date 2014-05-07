// D3 Charts go here.

$(document).ready(function(){
  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label; })    //Specify the data accessors.
    .y(function(d) { return d.value; })
    .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
    .tooltips(false)        //Don't show tooltips
    .showValues(true)       //...instead, show the bar value right on top of each bar.
    .transitionDuration(350);
    chart.yAxis.tickFormat(d3.format(',f'));
    chart.valueFormat(d3.format('d'));

    d3.select('#colorChart svg')
    .datum(colorData())
    .call(chart);
    //.attr('width', width).attr('height', height);

    nv.utils.windowResize(chart.update);

    return chart;
  });

  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label; })    //Specify the data accessors.
    .y(function(d) { return d.value; })
    .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
    .tooltips(false)        //Don't show tooltips
    .showValues(true)       //...instead, show the bar value right on top of each bar.
    .transitionDuration(350);
    chart.yAxis.tickFormat(d3.format(',f'));
    chart.valueFormat(d3.format('d'));

    d3.select('#intColorChart svg')
    .datum(intColorData())
    .call(chart);



    nv.utils.windowResize(chart.update);

    return chart;
  });

  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label; })    //Specify the data accessors.
    .y(function(d) { return d.value; })
    .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
    .tooltips(false)        //Don't show tooltips
    .showValues(true)       //...instead, show the bar value right on top of each bar.
    .transitionDuration(350);
    chart.yAxis.tickFormat(d3.format(',f'));
    chart.valueFormat(d3.format('d'));

    d3.select('#intExtComboChart svg')
    .datum(intExtComboData())
    .call(chart);
    // .attr('width', width).attr('height', height);

    nv.utils.windowResize(chart.update);

    return chart;
  });

  // //Regular pie chart example
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
    .x(function(d) { return d.label; })
    .y(function(d) { return d.value; })
    .showLabels(true);
    chart.valueFormat(d3.format('d'));

    d3.select("#transChart svg")
    .datum(transData())
    .call(chart)
    .attr('width', width).attr('height', height);
    // .attr('width', width).attr('height', height);


    return chart;
  });

  function intExtComboData(){
    return [
    {
      key: "Int/Ext Combo",
      values: [


      {
        "label":"Deep Sea Blue - Taupe",
        "value":1
      },
      {
        "label":"Mineral Gray - Beige",
        "value":1
      },

      {
        "label":"Jet Black - Terra",
        "value":1
      },
      {
        "label":"Sapphire Black - Beige",
        "value":1
      },
      {
        "label":"Sapphire Black - Beige Vinyl",
        "value":1
      },
      {
        "label":"Blue Water - Beige",
        "value":1
      },
      {
        "label":"Blue Water - Black",
        "value":1
      },
      {
        "label":"Deep Sea Blue - Terra",
        "value":1
      },
      {
        "label":"Titanium Silver - Taupe",
        "value":1
      },
      {
        "label":"Vermillion Red - Beige",
        "value":1
      },

      {
        "label":"Alpine White - Terra",
        "value":1
      },

      {
        "label":"Vermillion Red - Blk/Blue",
        "value":1
      },
      {
        "label":"Vermillion Red - Taupe",
        "value":1
      },
      {
        "label":"LeMans Blue - Terra",
        "value":1
      },
      {
        "label":"Deep Sea Blue - Blk Sensatec",
        "value":1
      },
      {
        "label":"Deep Sea Blue - Beige",
        "value":1
      },
      {
        "label":"Carbon Black - Terra",
        "value":1
      },

      {
        "label":"Deep Sea Blue - Beige Vinyl",
        "value":1
      },

      {
        "label":"Sapphire Black - Oyster",
        "value":1
      },
      {
        "label":"Sapphire Black - Taupe",
        "value":1
      },



      {
        "label":"Space Gray - Oyster",
        "value":1
      },

      {
        "label":"Space Gray - Terra",
        "value":1
      },

      {
        "label":"Mineral Gray - Taupe",
        "value":2
      },
      {
        "label":"Cashmere Silver - Blk/Blue",
        "value":2
      },

      {
        "label":"Vermillion Red - Black",
        "value":2
      },
      {
        "label":"LeMans Blue - Beige",
        "value":2
      },
      {
        "label":"Alpine White - Taupe",
        "value":2
      },

      {
        "label":"Deep Sea Blue - Black",
        "value":2
      },
      {
        "label":"Deep Sea Blue - Oyster",
        "value":2
      },
      {
        "label":"LeMans Blue - Taupe",
        "value":2
      },


      {
        "label":"LeMans Blue - Coral",
        "value":3
      },



      {
        "label":"Deep Sea Blue - Coral",
        "value":3
      },
      {
        "label":"Space Gray - Taupe",
        "value":3
      },


      {
        "label":"Vermillion Red - Coral",
        "value":3
      },
      {
        "label":"Titanium Silver - Blk Sensatec",
        "value":4
      },
      {
        "label":"Alpine White - Beige",
        "value":4
      },
      {
        "label":"Sapphire Black - Coral",
        "value":4
      },


      {
        "label":"Alpine White - Oyster",
        "value":4
      },


      {
        "label":"Carbon Black - Blk Sensatec",
        "value":4
      },

      {
        "label":"Space Gray - Blk Sensatec",
        "value":4
      },

      {
        "label":"Vermillion Red - Oyster",
        "value":4
      },
      {
        "label":"Titanium Silver - Black",
        "value":5
      },
      {
        "label":"LeMans Blue - Black",
        "value":5
      },
      {
        "label":"Titanium Silver - Coral",
        "value":6
      },



      {
        "label":"Mineral Gray - Blk Sensatec",
        "value":6
      },
      {
        "label":"Space Gray - Blk/Blue",
        "value":6
      },
      {
        "label":"LeMans Blue - Blk Sensatec",
        "value":7
      },
      {
        "label":"Space Gray - Black",
        "value":7
      },
      {
        "label":"Carbon Black - Coral",
        "value":8
      },
      {
        "label":"Sapphire Black - Black",
        "value":8
      },

      {
        "label":"Jet Black - Coral",
        "value":8
      },

      {
        "label":"Carbon Black - Oyster",
        "value":9
      },
      {
        "label":"Deep Sea Blue - Blk/Blue",
        "value":9
      },

      {
        "label":"Mineral Gray - Oyster",
        "value":10
      },

      {
        "label":"LeMans Blue - Oyster",
        "value":10
      },
      {
        "label":"Space Gray - Coral",
        "value":11
      },
      {
        "label":"Alpine White - Blk Sensatec",
        "value":13
      },
      {
        "label":"Jet Black - Blk Sensatec",
        "value":13
      },
      {
        "label":"Mineral Gray - Black",
        "value":15
      },





      {
        "label":"Mineral Gray - Blk/Blue",
        "value":15
      },
      {
        "label":"Jet Black - Blk/Blue",
        "value":16
      },
      {
        "label":"Sapphire Black - Blk/Blue",
        "value":17
      },
      {
        "label":"Mineral Gray - Coral",
        "value":19
      },
      {
        "label":"Carbon Black - Black",
        "value":20
      },
      {
        "label":"Jet Black - Black",
        "value":21
      },


      {
        "label":"Alpine White - Black",
        "value":23
      },


      {
        "label":"Alpine White - Coral",
        "value":31
      },

      {
        "label":"Alpine White - Blk/Blue",
        "value":47
      },
      {
        "label":"Carbon Black - Blk/Blue",
        "value":54
      },


      {
        "label":"LeMans Blue - Blk/Blue",
        "value":89
      },


      ]

    }

    ];
  }

  //Each bar represents a single discrete quantity.
  function intColorData(){
    return [
    {
      key: "Interior Colors",
      values: [
      {
        "label": "Beige Vinyl",
        "value": 2
      },
      {
        "label": "Terra",
        "value": 6
      },
      {
        "label": "Beige",
        "value": 11
      },
      {
        "label": "Taupe",
        "value": 13
      },
      {
        "label": "Oyster",
        "value": 41
      },
      {
        "label": "Blk Sensatec",
        "value": 52
      },
      {
        "label": "Coral",
        "value": 96
      },
      {
        "label": "Black",
        "value": 109
      },
      {
        "label": "Blk/Blue",
        "value": 256
      },

      ]

    }

    ];


  }


  function colorData() {
    return [
    {
      key: "Colors",
      values: [
      {
        "label" : "Cashmere Silver" ,
        "value" : 2
      },

      {
        "label" : "Blue Water" ,
        "value" : 2
      },
      {
        "label" : "Vermillion Red" ,
        "value" : 12
      },
      {
        "label" : "Titanium Silver" ,
        "value" : 16
      },
      {
        "label" : "Deep Sea Blue" ,
        "value" : 21
      },
      {
        "label" : "Sapphire Black" ,
        "value" : 33
      },
      {
        "label" : "Space Gray" ,
        "value" : 33
      },
      {
        "label" : "Jet Black" ,
        "value" : 59
      },
      {
        "label" : "Mineral Gray" ,
        "value" : 68
      },
      {
        "label" : "Carbon Black" ,
        "value" : 96
      } ,
      {
        "label" : "LeMans Blue" ,
        "value" : 119
      } ,
      {
        "label" : "Alpine White" ,
        "value" : 125
      } ,
      ]
    }
    ];
  }

  function transData() {
    return [

    {
      "label" : "DCT (7-Speed Auto) " ,
      "value" : 347
    } ,
    {
      "label" : "6-Speed Manual" ,
      "value" : 239
    } ,
    ];
  }

});

// $(document).ready(function(){


// nv.addGraph(function() {
//   var chart = nv.models.discreteBarChart()
//       .x(function(d) { return d.label; })    //Specify the data accessors.
//       .y(function(d) { return d.value; })
//       .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
//       .tooltips(false)        //Don't show tooltips
//       .showValues(true)       //...instead, show the bar value right on top of each bar.
//       .transitionDuration(350);
//       chart.yAxis.tickFormat(d3.format(',f'));
//       chart.valueFormat(d3.format('d'));
//
//   d3.select('#transChart svg')
//       .datum(transData())
//       .call(chart);
//
//   nv.utils.windowResize(chart.update);
//
//   return chart;
// });

//Each bar represents a single discrete quantity.

// });
