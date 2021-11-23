const fs = require('fs')

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { deploy, get } = deployments
  const { feesSetter } = await getNamedAccounts()

  await deploy('SnowSwapFactory', {
    from: feesSetter,
    args: [feesSetter],
  })

  console.log('SnowSwapFactory address =', (await get('SnowSwapFactory')).address)

  try {
    const obj = { factoryAddress: (await get('SnowSwapFactory')).address }

    fs.writeFileSync('../SnowSwapContracts.json', JSON.stringify(obj))
  } catch (e) {
    console.log(e)
  }
}
module.exports.tags = ['SnowSwapFactory']
