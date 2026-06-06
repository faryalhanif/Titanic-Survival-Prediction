# Backend — FastAPI

## Setup

```bash
cd backend
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

API will be available at http://localhost:8000  
Interactive docs: http://localhost:8000/docs

## Endpoints

| Method | Path       | Description              |
|--------|------------|--------------------------|
| GET    | /          | Health check             |
| POST   | /predict   | Predict survival         |

### POST /predict — Request Body

```json
{
  "pclass": 3,
  "sex": "male",
  "age": 22,
  "fare": 7.25,
  "sibsp": 1,
  "parch": 0,
  "embarked": "S"
}
```
