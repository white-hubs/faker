import sleep from './sleep'

const retryDelays = [0, 500, 1000, 1500]

export default async (action, delays = retryDelays) => {
  for (let i = 0; i < delays.length; i++) {
    const timeout = delays[i]
    await sleep(timeout)
    try {
      return await action()
    } catch (e) {
      console.error(e)
      if (i === delays.length - 1) {
        throw new Error('retry failed')
      }
    }
  }
}
