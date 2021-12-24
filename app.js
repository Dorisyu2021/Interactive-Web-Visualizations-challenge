//function the metadata
function deInfo(name){
    console.log(name);
    d3.json("samples.json").then((data)=>{
        let metadata=data.metadata;
        //get the value of one name
        let result=metadata.filter(nameResult => nameResult.id==name)
        
        //access index 0 from the array
        let resultFirst=result[0];
        console.log(resultFirst);

        //clear data out everytime
        d3.select("#sample-metadata").html("");

        Object.entries(resultFirst).forEach(([key,value])=>{
            d3.select("#sample-metadata").append("h5").text(`${key}:${value}`);
        })

    });
}

function barChart(name){
    //console.log(name);
    //let data=d3.json("samples.json");
    //console.log(data);
    
    d3.json("samples.json").then((data)=>{
        let sampledata=data.samples;
        //console.log(sampledata);
        //get the value of one name
        let result=sampledata.filter(sampleResult => sampleResult.id==name)
        
        //access index 0 from the array
        let resultFirst=result[0];
        //console.log(resultFirst);

        let otu_ids=resultFirst.otu_ids;
        let otu_labels=resultFirst.otu_labels;
        let sample_values=resultFirst.sample_values
        console.log(otu_ids)

        //build bar chart
        let yticks=otu_ids.slice(0,10).map(id=>`OTU ${id}`);
        //console.log(yticks)
        let xvalues=sample_values.slice(0,10);
        //console.log(xvalues)
        let textlabels=otu_labels.slice(0,10)

        let barChart={
            y:yticks.reverse(),
            x:xvalues.reverse(),
            text:textlabels.reverse(),
            type:"bar",
            orientation:"h"
        }
        let layout={
            title:"Top 10"
        };

        Plotly.newPlot("bar",[barChart],layout);
    });
}

//build bubble chart
function bubbleChart(name){
    d3.json("samples.json").then((data)=>{
        let sampledata=data.samples;
        //console.log(sampledata);
        //get the value of one name
        let result=sampledata.filter(sampleResult => sampleResult.id==name)
        
        //access index 0 from the array
        let resultFirst=result[0];
        //console.log(resultFirst);

        let otu_ids=resultFirst.otu_ids;
        let otu_labels=resultFirst.otu_labels;
        let sample_values=resultFirst.sample_values
        //console.log(otu_ids)

        //build bubble chart

        let bubbleChart={
            y:sample_values,
            x:otu_ids,
            text:otu_labels,
            mode:"markers",
            marker:{
                size:sample_values,
                color:otu_ids,
                colorscale:"Earth"
            }

        };

        let layout={
            title:"Bubble per sample",
            hovermode:"closest",
            xaxis:{title:"OTU ID"}
        };
        
        
        Plotly.newPlot("bubble",[bubbleChart],layout)
    });

};

//build Gauge chart
function gaugeChart(name){
    d3.json("samples.json").then((data)=>{
        let sampledata=data.samples;
        //console.log(sampledata);
        //get the value of one name
        let result=sampledata.filter(sampleResult => sampleResult.id==name)
        
        //access index 0 from the array
        let resultFirst=result[0];
        //console.log(resultFirst);
       
        let value=resultFirst.wfreq
        

        //build gauge chart

        let gaugeChart={
            domain: { x: [0, 1], y: [0, 9] },
		    value: value,
		    title:"Belly Button Washing Frequency",
		    type: "indicator",
		    mode: "gauge+number",
            delta: { reference: 380 },
            gauge: {
                  axis: { range: [1, 9] },
                  steps: [
                    { range: [0, 4], color: "lightgreen" },
                    { range: [4, 9], color: "green" }
                  ],
                  }

        };

        let layout={width: 600, height: 500, margin: { t: 0, b: 0 },
        margin: { t: 1, r: 1, l: 1, b: 1}};
        
        
        Plotly.newPlot("gauge",[gaugeChart],layout)
    });

};


// Initializes the page
function Initialize(){

    //access the dropdown from index.html
    var select=d3.select("#selDataset");

    data=d3.json("samples.json").then((data)=>{
        let names=data.names;
        names.forEach((name)=> {select.append("option").text(name).property("value",name);
            
        });
        //when initialized, pass the first sample
        let name1=names[0];
        deInfo(name1);
        barChart(name1);
        bubbleChart(name1);
        gaugeChart(name1)
    });
    
    
};

function optionChanged(item){
    //console.log(item)
    deInfo(item);
    barChart(item);
    bubbleChart(item);
    gaugeChart(item)
}


// call initialize
Initialize();


