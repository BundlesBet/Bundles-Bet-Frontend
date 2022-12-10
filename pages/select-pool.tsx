import SelectPoolTabs from 'components/SelectPool'
import { NextPage } from 'next'
import Head from 'next/head'

interface Props {}

const SelectPool: NextPage<Props> = ({}) => {
  return (
    <div>
      <Head>
        <title>Select Pool</title>
      </Head>
      <SelectPoolTabs />
    </div>
  )
}

export default SelectPool
