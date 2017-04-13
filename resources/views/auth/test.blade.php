@extends('app')

@section('content')
<style>* {
	padding: 0;
	margin: 0;
	
}
body{
	background-color: #444;
}
.node circle {
	cursor: pointer;
	fill: #fff;
	stroke: steelblue;
	stroke-width: 2px;
}

.node text {
	font-size: 12px;
}

.link {
	fill: none;
	stroke: #ccc;
	stroke-width: 1.5px;
}

.path--background {
  fill: none;
  stroke: #FFF;
  stroke-width: 2px;
}

.label {
  font: 24px sans-serif;
  text-anchor: middle;
  color: #FFF;
}
#mySvg{
	/*background-color: #FFF;*/
	position: fixed;
	right:0;
}
@media only screen and (max-width: 900px) {
	#mySvg{
	display:none;
}
}
</style>

<script src="{{asset('/js/d3.js')}}"></script>

<script>var width = 900;
var height = 500;

//边界空白
var padding = {
	left: 80,
	right: 50,
	top: 20,
	bottom: 20
};

var svg = d3.select("body")
	.append("svg")
	.attr("width", width + padding.left + padding.right)
	.attr("height", height + padding.top + padding.bottom)
	.append("g")
	.attr("transform", "translate(" + padding.left + "," + padding.top + ")");

//树状图布局
var tree = d3.layout.tree()
	.size([height, width]);

//对角线生成器
var diagonal = d3.svg.diagonal()
	.projection(function(d) {
		return [d.y, d.x];
	});

d3.json("learn.json", function(error, root) {
	console.log(root);
	//给第一个节点添加初始坐标x0和x1
	root.x0 = height / 2;
	root.y0 = 0;

	//以第一个节点为起始节点，重绘
	redraw(root);

	//重绘函数
	function redraw(source) {
		/*
		（1） 计算节点和连线的位置
		*/
		//应用布局，计算节点和连线
		var nodes = tree.nodes(root);
		var links = tree.links(nodes);

		console.log(links);
		//重新计算节点的y坐标 是为了让它没有太大的变化
		nodes.forEach(function(d) {
			d.y = d.depth * 180;
		});
		links.forEach(function(d,i){
			d.isYellow=false;
		});
//		console.log(links);
		/*
		（2） 节点的处理
		*/

		//获取节点的update部分
		var nodeUpdate = svg.selectAll(".node")
			.data(nodes, function(d) {
				return d.name;
			});

		//获取节点的enter部分
		var nodeEnter = nodeUpdate.enter();

		//获取节点的exit部分
		var nodeExit = nodeUpdate.exit();

		//1. 节点的 Enter 部分的处理办法
		var enterNodes = nodeEnter.append("g")
			.attr("class", "node")
			.attr("transform", function(d) {
				return "translate(" + source.y0 + "," + source.x0 + ")";
			})
			.on("click", function(d) {
				toggle(d);
				redraw(d);
			})

		enterNodes.append("circle")
			.attr("r", 0)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});

		//添加文本
		enterNodes.append("text")
			.attr("x", function(d) {
				return d.children || d._children ? -14 : 14;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return d.children || d._children ? "end" : "start";
			})
			.attr("fill","#FFF")
			.style('font-size', '15px')
			.text(function(d) {
				return d.name;
			})
			.style("fill-opacity", 0);

		//2. 节点的 Update 部分的处理办法
		var updateNodes = nodeUpdate.transition()
			.duration(500)
			.attr("transform", function(d) {
				return "translate(" + d.y + "," + d.x + ")";
			});

		updateNodes.select("circle")
			.attr("r", 8)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});

		updateNodes.select("text")
			.style("fill-opacity", 1);

		//3. 节点的 Exit 部分的处理办法
		var exitNodes = nodeExit.transition()
			.duration(500)
			.attr("transform", function(d) {
				return "translate(" + source.y + "," + source.x + ")";
			})
			.remove();

		exitNodes.select("circle")
			.attr("r", 0);

		exitNodes.select("text")
			.style("fill-opacity", 0);

		/*
		（3） 连线的处理
		*/

		//获取连线的update部分
		var linkUpdate = svg.selectAll(".link")
			.data(links, function(d) {
				return d.target.name;
			});

		//获取连线的enter部分
		var linkEnter = linkUpdate.enter();

		//获取连线的exit部分
		var linkExit = linkUpdate.exit();

		//1. 连线的 Enter 部分的处理办法
		linkEnter.insert("path", ".node")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {
					x: source.x0,
					y: source.y0
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.transition()
			.duration(500)
			// .delay(function(d,i){
			//   return i*500;
			// })
			.attr("d", diagonal);

		//2. 连线的 Update 部分的处理办法
		linkUpdate.transition()
			.duration(500)
			// .delay(function(d,i){
			//   return i*100;
			// })
			.attr("d", diagonal);

		//3. 连线的 Exit 部分的处理办法
		linkExit.transition()
			.attr("d", function(d) {
				var o = {
					x: source.x,
					y: source.y
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.remove();
		
		/*
		（4） 将当前的节点坐标保存在变量x0、y0里，以备更新时使用
		*/
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});

	}

	//切换开关，d 为被点击的节点
	function toggle(d) {
		if(d.children) { //如果有子节点
			d._children = d.children; //将该子节点保存到 _children
			d.children = null; //将子节点设置为null
		} else { //如果没有子节点
			d.children = d._children; //从 _children 取回原来的子节点
			d._children = null; //将 _children 设置为 null
		}
	}

});</script>
<script>
		var width = 400,
			height = 600;

		var fields = [{
			value: 24,
			size: 24,
			label: "h",
			update: function(date) {
				return date.getHours();
			}
		}, {
			value: 60,
			size: 60,
			label: "m",
			update: function(date) {
				return date.getMinutes();
			}
		}, {
			value: 60,
			size: 60,
			label: "s",
			update: function(date) {
				return date.getSeconds();
			}
		}];

		var arc = d3.svg.arc()
			.innerRadius(height / 6.5 - 60)
			.outerRadius(height / 6.5 - 5)
			.startAngle(0)
			.endAngle(function(d) {
				return (d.value / d.size) * 2 * Math.PI;
			});

		var svg2 = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("id","mySvg");

		var field = svg2.selectAll(".field")
			.data(fields)
			.enter().append("g")
			.attr("transform", function(d, i) {
//				return "translate(" + (i * 2 + 1.25) / 6.5 * width + "," + height / 2 + ")";
				return "translate("+width/2+","+(i*2+1.25)/6.5*height+")";
			})
			.attr("class", "field");

		field.append("path")
			.attr("class", "path path--background")
			.attr("d", arc);

		var path = field.append("path")
			.attr("class", "path path--foreground");

		var label = field.append("text")
			.attr("class", "label")
			.attr("dy", ".35em")
			.attr("stroke","#FFF");

		(function update() {
			var now = new Date();

			field
				.each(function(d) {
					d.previous = d.value, d.value = d.update(now);
				});

			path.transition()
				.ease("elastic")
				.duration(750)
				.attrTween("d", arcTween);

			label
				.text(function(d) {
					return d.value + d.label;
				});

			setTimeout(update, 1000 - (now % 1000));
		})();

		function arcTween(b) {
			var i = d3.interpolate({
				value: b.previous
			}, b);
			return function(t) {
				return arc(i(t));
			};
		}
</script>
@endsection
