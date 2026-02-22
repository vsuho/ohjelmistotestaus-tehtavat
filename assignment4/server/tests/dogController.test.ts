import { describe, expect, test, vi, beforeEach } from "vitest"
import * as dogService from "../services/dogService"
import { getDogImage } from "../controllers/dogController"

vi.mock("../services/dogService")

const createMockResponse = () => {
    const res: any = {}
    res.json = vi.fn()
    return res
}

describe('DogController.getDogImage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should return dog image successfully', async () => {
    const req: any = {}
    const res = createMockResponse()
    const mockData = {
      imageUrl: 'welsh-dog',
      status: 'success'
    }

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockData)

    await getDogImage(req, res)

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockData
    })
  })
})