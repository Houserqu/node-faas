import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Editor from "./Editor";

interface Props {
  defaultCode: string
  defaultParams?: string
}

export default function Config({ defaultCode, defaultParams = '' }: Props) {
  const [params, setParams] = useState<any>(defaultParams)
  const [code, setCode] = useState<string>(defaultCode)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const submit = () => {
    setSubmitLoading(true)
    axios.post('/api/run', { code, params }).then(res => {
      if (res.data.ret !== 0) {
        Modal.error({ title: '执行失败', content: res.data.msg })
        return;
      }

      Modal.success({
        content: (
          <Form>
            <Form.Item label="执行耗时">{res.data.data.runTime}</Form.Item>
            <Form.Item label="执行结果">
              {typeof res.data.data.result === 'string' ? res.data.data.result : JSON.stringify(res.data.data.result)}
            </Form.Item>
          </Form>
        ),
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
        <Form.Item label="参数（json）">
          <Editor defaultValue={params} height={160} onChange={setParams} language='json' />
        </Form.Item>
        <Form.Item name="code" label="代码（js）">
          <Editor defaultValue={code} onChange={setCode} />
        </Form.Item>
        <Form.Item name='action'>
          <Button type="primary" className="mr-2" onClick={submit} loading={submitLoading}>执行</Button>
        </Form.Item>
      </Form>
    </div>
  )
}