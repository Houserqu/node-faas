import { Layout, Tabs } from 'antd'
import { useState } from 'react'
import Config from './Config'
import data from './fun'

const { Content } = Layout;

function App() {
  const [funcList, setFuncList] = useState<{ name: string, code: string, params: any[] }[]>(data)

  return (
    <div className="App">
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Content style={{ padding: '24px', minHeight: 280, backgroundColor: '#fff' }}>
              <Tabs defaultActiveKey="1" tabPosition='left' destroyInactiveTabPane>
                {funcList.map(v => (
                  <Tabs.TabPane tab={`Tab-${v.name}`} key={v.name}>
                    <Config defaultCode={v.code} defaultParams={v.params} />
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Content>
          </Layout>
        </Content>
      </Layout>

    </div>
  )
}

export default App
