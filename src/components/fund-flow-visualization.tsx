'use client'

import { ResponsiveSankey } from '@nivo/sankey'

const mockData = {
  nodes: [
    { id: 'Treasury' },
    { id: 'Development' },
    { id: 'Marketing' },
    { id: 'Community' },
    { id: 'Frontend' },
    { id: 'Backend' },
    { id: 'Social Media' },
    { id: 'Events' },
  ],
  links: [
    { source: 'Treasury', target: 'Development', value: 50000 },
    { source: 'Treasury', target: 'Marketing', value: 30000 },
    { source: 'Treasury', target: 'Community', value: 20000 },
    { source: 'Development', target: 'Frontend', value: 30000 },
    { source: 'Development', target: 'Backend', value: 20000 },
    { source: 'Marketing', target: 'Social Media', value: 20000 },
    { source: 'Marketing', target: 'Events', value: 10000 },
    { source: 'Community', target: 'Events', value: 20000 },
  ]
}

export function FundFlowVisualization() {
  return (
    <div style={{ height: '500px' }}>
      <ResponsiveSankey
        data={mockData}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
      />
    </div>
  )
}