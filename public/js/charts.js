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

    nv.utils.windowResize(chart.update);

    return chart;
  });

  //Each bar represents a single discrete quantity.
  function colorData() {
   return [
   {
    key: "Colors",
      values: [
        {
          "label" : "Alpine White" ,
          "value" : 125
        } ,

        {
          "label" : "LeMans Blue" ,
          "value" : 119
        } ,
        {
          "label" : "Carbon Black" ,
          "value" : 96
        } ,
        {
          "label" : "Mineral Gray" ,
          "value" : 68
        },

        {
          "label" : "Jet Black" ,
          "value" : 59
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
          "label" : "Deep Sea Blue" ,
          "value" : 21
        },
        {
          "label" : "Titanium Silver" ,
          "value" : 16
        },
        {
          "label" : "Vermillion Red" ,
          "value" : 12
        },

        {
          "label" : "Cashmere Silver" ,
          "value" : 2
        },

        {
          "label" : "Blue Water" ,
          "value" : 2
        },
      ]
      }
    ];
  }
});

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

    d3.select('#transChart svg')
        .datum(transData())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });

  //Each bar represents a single discrete quantity.
  function transData() {
   return [
   {
    key: "Transmission",
      values: [
        {
          "label" : "DCT" ,
          "value" : 347
        } ,
        {
          "label" : "6-Speed Manual" ,
          "value" : 239
        } ,
      ]
      }
    ];
  }
});
