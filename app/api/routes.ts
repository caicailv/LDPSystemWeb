// pages/api/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'

const handler = nextConnect()

handler.post('/api/register', async (req, res) => {
  const { nickname, password, avatar_url, bio } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const [result] = await pool.query(
      'INSERT INTO users (nickname, password, avatar_url, bio) VALUES (?, ?, ?, ?)',
      [nickname, hashedPassword, avatar_url, bio]
    )
    res.status(201).json({ message: 'User registered' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

handler.post('/submit_score', async (req, res) => {
  const { user_id, map_id, speed, distance } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO scores (user_id, map_id, speed, distance) VALUES (?, ?, ?, ?)',
      [user_id, map_id, speed, distance]
    )
    res.status(201).json({ message: 'Score submitted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

handler.get('/map_rankings', async (req, res) => {
  const { map_id } = req.query

  try {
    const [results] = await pool.query(
      'SELECT users.nickname, scores.speed, scores.distance FROM scores JOIN users ON scores.user_id = users.id WHERE map_id = ? ORDER BY speed DESC',
      [map_id]
    )
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

handler.post('/upload_mileage', async (req, res) => {
  const { user_id, distance } = req.body

  try {
    const [result] = await pool.query(
      'INSERT INTO mileage_records (user_id, distance) VALUES (?, ?)',
      [user_id, distance]
    )
    res.status(201).json({ message: 'Mileage uploaded' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

handler.delete('/delete_mileage', async (req, res) => {
  const { id } = req.query

  try {
    const [result] = await pool.query(
      'DELETE FROM mileage_records WHERE id = ?',
      [id]
    )
    res.status(200).json({ message: 'Mileage record deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

handler.get('/mileage_rankings', async (req, res) => {
  try {
    const [results] = await pool.query(
      'SELECT users.nickname, SUM(mileage_records.distance) as total_distance FROM mileage_records JOIN users ON mileage_records.user_id = users.id GROUP BY user_id ORDER BY total_distance DESC'
    )
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default handler
