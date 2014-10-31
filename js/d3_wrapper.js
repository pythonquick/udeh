// Takes in a jquery selector to create into the svg canvas
// and an onclick function that takes one argument, the sku
// outputs an object with three functions
//   addnode(sku, radius, imageurl)
//   addlink(sku1, sku2, linkType) // linkType is just a class to use
//   clear() // reset the entire graph
function initD3(selector, onclick, dblclick) {
	var j = $(selector),
		width = j.width(),
		height = j.height();

	var fill = d3.scale.category20();
	var force = d3.layout.force()
		.size([width, height])
		.linkDistance(Math.max(width, height)/8)
		.charge(-750)
		.on("tick", tick);

	var svg = d3.select(selector).append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.append("rect")
		.attr("width", width)
		.attr("height", height);

	var defs = svg.append('svg:defs');

/*
<filter id="dropshadow" height="130%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> <!-- stdDeviation is how much to blur -->
  <feOffset dx="2" dy="2" result="offsetblur"/> <!-- how much to offset -->
  <feMerge> 
    <feMergeNode/> <!-- this contains the offset blurred image -->
    <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
  </feMerge>
</filter>
*/

	var dropshadow = svg.append("filter")
		.attr("id", "dropshadow")
		.attr("height", "130%");
	
	dropshadow.append("feGaussianBlur")
		.attr("in", "SourceAlpha")
		.attr("stdDeviation", "3");
	dropshadow.append("feOffset")
		.attr("dx", 2)
		.attr("dy", 3)
		.attr("result", "offsetblur");
	var merge = dropshadow.append("feMerge");
	
	merge.append("feMergeNode");
	merge.append("feMergeNode").attr("in", "SourceGraphic");

	var nodes = force.nodes(),
		links = force.links(),
		node = svg.selectAll(".node"),
		link = svg.selectAll(".link");

	restart();

	function addnode(sku, radius, image) {
		// only build filter once
		if ($("#filter-"+sku).length === 0) {
			var filter = svg.append('svg:filter')
				.attr('id', 'filter-'+sku)
				.attr('primitiveUnits', "objectBoundingBox")
				.attr('width', "102%")
				.attr('height', "102%")
				.attr('x', "-1%")
				.attr('y', "-1%");
			
			filter.append('svg:feImage')
				.attr("result", "raster")
				.attr('xlink:href', image)
				.attr('width', "50%")
				.attr('height', "50%")
				.attr('x', "25%")
				.attr('y', "25%");
				
			filter.append('svg:feBlend')
				.attr("in2", "SourceGraphic")
				.attr("in", "raster")
				.attr("mode", "normal");
		}
		
		var node = {x: width/2, y: height/2, sku: sku, radius: radius, image:image};
			n = nodes.push(node);

		restart();

		return node;
	}

	function getNodeBySKU(sku) {
		var res = null;
		nodes.forEach(function(target) {
			if (target.sku == sku) {
				res = target;
			}
		});
		return res;
	}

	function linknodes(sku1, sku2, linkType) {
		var node1 = getNodeBySKU(sku1), node2 = getNodeBySKU(sku2);
		if (node1 === null || node2 === null) { return; }
		links.push({source: node1, target: node2, linkType: linkType});

		restart();
	}

	// Generic d3 tick function
	function tick() {
	  link.attr("x1", function(d) { return d.source.x; })
		  .attr("y1", function(d) { return d.source.y; })
		  .attr("x2", function(d) { return d.target.x; })
		  .attr("y2", function(d) { return d.target.y; });

	  node.attr("cx", function(d) { return d.x; })
		  .attr("cy", function(d) { return d.y; });
	}

	function restart() {
	  link = link.data(links);

	  link.enter().insert("line", ".node")
		  .attr("class", function(d) { return "link " + d.linkType; });

	  node = node.data(nodes);

	  node.enter().insert("circle", ".cursor")
		  .attr("class", "node")
		  .attr("r", function (d) { return d.radius; })
		  .attr('filter', function(d) { return "url(#filter-"+d.sku+")"; })
		  .call(force.drag)
		  .on("click", function(d) {
			if (d3.event.defaultPrevented) return; // ignore drag
			onclick(d.sku);
		  })
		  .on("dblclick", function(d){dblclick(d.sku);});

	  force.start();
	}
	
	function clear() {
		while(nodes.length > 0) {
			nodes.pop();
		}
		while(links.length > 0) {
			links.pop();
		}
		node.remove();
		link.remove();
		restart();
	}
	
	return {clear: clear, addnode: addnode, linknodes: linknodes}
}
