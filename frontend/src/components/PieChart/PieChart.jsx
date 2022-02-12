import React from 'react';

import PieChart, {
	Series,
	Label,
	Connector,
	Size,
} from 'devextreme-react/pie-chart';
import './pieChart.css';

function PieChartComp({ title, areas }) {
	return (
		<div className="pieChartContainer">
			<h2>{title}</h2>
			<PieChart
				legend={{
					horizontalAlignment: 'center',
					width: '80vw',
					verticalAlignment: 'bottom',
				}}
				id="pie"
				dataSource={areas}
				palette="Bright"
				className="pieChart"
			>
				<Series argumentField="category" valueField="area">
					<Label visible={true}>

						<Connector visible={true} width={0.5} />
					</Label>
				</Series>
				<Size width="100%" />
			</PieChart>
		</div>
	);
}

export default PieChartComp;
