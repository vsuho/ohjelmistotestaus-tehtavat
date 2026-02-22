import { describe, expect, test, vi, beforeEach } from "vitest"
import * as dogController from "../controllers/dogController"
import { Request, Response } from "express"
import request from "supertest"
import app from "../index"

vi.mock("../controllers/dogController")

describe('DogRoutes.GET /api/dogs/random', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })
    test('should return random dog image with 200 status', async () => {
        const mockData = {
            imageUrl: 'https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg',
            status: 'success'
        }
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
            res.json({
                success: true,
                data: mockData
            })
            
        })

        const response = await request(app).get('/api/dogs/random')

        expect(response.status).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.data.imageUrl).toBe('https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg')
    })

    test('should return 500 status', async () => {
        
        vi.mocked(dogController.getDogImage).mockImplementation(
            async (req: Request, res: Response) => {
                res.status(500).json({
                    success: false,
                    error: 'Failed to fetch dog image: Network error'
                })
            }
        )
        const response = await request(app).get('/api/dogs/random')

        expect(response.status).toBe(500)
        expect(response.body.error).toBe('Failed to fetch dog image: Network error')

        
    })
})