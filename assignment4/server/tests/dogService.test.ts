import { describe, expect, test, vi, beforeEach, afterEach } from "vitest"
import * as dogService from "../services/dogService"

describe('DogService.getRandomDogImage', () => {
 beforeEach(() => {
    global.fetch = vi.fn()
 })

 afterEach(() => {  
    vi.clearAllMocks
    vi.resetAllMocks()
 })

  test('should return dog image successfully', async () => {
    
    vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'welsh-dog', status: 'success'}),
    } as Response)

    const result = await dogService.getRandomDogImage()

    expect(result.imageUrl).toBe('welsh-dog')
    expect(result.status).toBe('success')
  })
  
  test('should throw error when call for dog image is rejected', async () => {
    const errorMessage = 'Failed to fetch dog image: Dog API returned status undefined'

    vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({ status: errorMessage })
    }as Response)

    await expect(dogService.getRandomDogImage()).rejects.toThrow(errorMessage)
  })
})