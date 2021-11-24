const fs = require('fs')

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, get } = deployments
  const { feesSetter } = await getNamedAccounts()

  await deploy('SnowswapFactory', {
    from: feesSetter,
    args: [feesSetter],
  })

  console.log('SnowswapFactory address =', (await get('SnowswapFactory')).address)

  try {
    const obj = { factoryAddress: (await get('SnowswapFactory')).address }

    fs.writeFileSync('../SnowSwapContracts.json', JSON.stringify(obj))
  } catch (e) {
    console.log(e)
  }
}
module.exports.tags = ['SnowswapFactory']
