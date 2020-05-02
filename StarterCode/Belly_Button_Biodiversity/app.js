
// Creating function for Data plotting (Bar, gauge, bubble)
function getPlot(id) {
    // getting data from the json file
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
  
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
        // filters by id 
        var samples = data.samples.filter(s => s.id.toString() == id)[0]
  
        // top10
        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        //top10 otu
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // otu id
        var OTU_id = OTU_top.map(d => "OTU " + d)
        console.log(`OTU IDS: ${OTU_id}`)
  
        //top 10 labels
        var labels = samples.otu_labels.slice(0, 10);
        console.log(`Labels: ${labels}`)

        // trace plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(8,249,201)'},
            type:"bar",
            orientation: "h",
        };
  
        var data = [trace];
  
        // plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout)
      
        // bubble chart
        var tracex = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // bubble layout
        var layoutx = {
            xaxis:{title: "OTU ID"},
            height: 800,
            width: 1200
        };
  
        // creating data variable 
        var datax = [tracex];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_b); 
  
        // The guage chart
  
        var datay = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "yellow" },
                    { range: [2, 4], color: "cyan" },
                    { range: [4, 6], color: "teal" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 9], color: "green" },
                  ]}
              
          }
        ];
        var layouty = { 
            width: 600, 
            height: 500, 
            margin: { t: 15, b: 30, l:80, r:80 } 
          };
        Plotly.newPlot("gauge", datay, layouty);
      });
  }  
// get data
function getInfo(id) {
    d3.json("Data/samples.json").then((data)=> {
        
        // metadata
        var metadata = data.metadata;

        console.log(`Metadata: ${metadata}`)

        // metadata id
        var results = metadata.filter(meta => meta.id.toString() == id)[0];

        var demoinfo = d3.select("#sample-metadata");
        demoinfo.html("");

        // demo data for id
        Object.entries(results).forEach((key) => {   
                demoinfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}



init();