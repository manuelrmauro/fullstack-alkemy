import React from 'react';

import PieChart, {
	Series,
	Label,
	Connector,
	Size,
	Export,
} from 'devextreme-react/pie-chart';

const areas = [
	{
		country: 'Russia',
		area: 12,
	},
	{
		country: 'Canada',
		area: 7,
	},
	{
		country: 'USA',
		area: 7,
	},
	{
		country: 'China',
		area: 7,
	},
	{
		country: 'Brazil',
		area: 6,
	},
	{
		country: 'Australia',
		area: 5,
	},
	{
		country: 'India',
		area: 2,
	},
	{
		country: 'Others',
		area: 55,
	},
];

function PieChartComp({title}) {
	return (
		<PieChart
			id="pie"
			dataSource={areas}
			palette="Bright"
			title={title}
		>
			<Series argumentField="country" valueField="area">
				<Label visible={true}>
					<Connector visible={true} width={1} />
				</Label>
			</Series>

			<Size width='500' />
			<Export enabled={true} />
		</PieChart>
	);
}

export default PieChartComp;
