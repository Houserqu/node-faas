import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Editor from "./Editor";

interface Props {
  defaultCode: string
  defaultParams?: { key: string; value: string }[]
}

export default function Config({ defaultCode, defaultParams = [] }: Props) {
  const [params, setParams] = useState<{ key: string; value: string }[]>(defaultParams)
  const [code, setCode] = useState<string>(defaultCode)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const addParam = () => {
    setParams([...params, { key: '', value: '' }])
  }

  const submit = () => {
    const query: any = {}
    params.forEach(({ key, value }) => {
      query[key] = value
    })

    setSubmitLoading(true)
    axios.post('/api/run', code, {
      params: query,
      headers: {
        'content-type': 'text/plain'
      }
    }).then(res => {
      if (res.data.ret !== 0) {
        Modal.error({ title: '执行失败', content: res.data.msg })
        return;
      }

      Modal.success({
        content: typeof res.data.data === 'string' ? res.data.data : JSON.stringify(res.data.data),
        title: '执行成功',
        width: 800
      })
    }).catch(error => {
      Modal.error({ title: '网络异常', content: error.message })
    }).finally(() => {
      setSubmitLoading(false)
    })
  }

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="参数">
          {params.map((v, i) => (
            <div key={i} className="mt-2">
              <Input.Group compact>
                <Input style={{ width: '20%' }} defaultValue={v.key} placeholder="key" />
                <Input style={{ width: '30%' }} defaultValue={v.value} placeholder="value" />
              </Input.Group>
            </div>
          ))}
          <Button className="mt-2" onClick={addParam} type='primary' ghost>新增参数</Button>
        </Form.Item>
        <Form.Item name="code" label="代码">
          <div style={{ border: '1px solid #bebebe' }}>
            <Editor defaultValue={code} onChange={setCode} />
          </div>

        </Form.Item>
        <Form.Item name='action'>
          <Button type="primary" className="mr-2" onClick={submit} loading={submitLoading}>执行</Button>
        </Form.Item>
      </Form>
    </div>
  )
}