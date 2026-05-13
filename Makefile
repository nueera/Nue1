.PHONY: help dev up down build logs migrate seed lint test

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# ─── Development ────────────────────────────────────────────
dev: ## Start all services in detached mode
	docker compose up --build -d

up: ## Start services (no rebuild)
	docker compose up -d

down: ## Stop all services
	docker compose down

build: ## Build all images
	docker compose build

logs: ## Tail logs for all services
	docker compose logs -f

# ─── Database ───────────────────────────────────────────────
migrate: ## Run database migrations
	docker compose exec backend alembic upgrade head

seed: ## Seed the database with sample data
	docker compose exec backend python -m scripts.seed

# ─── Code Quality ───────────────────────────────────────────
lint: ## Lint frontend & backend
	cd frontend && npx next lint
	cd backend  && ruff check . && mypy .

test: ## Run all tests
	cd frontend && npx jest
	cd backend  && pytest

# ─── Setup ──────────────────────────────────────────────────
setup: ## First-time project setup
	cp -n .env.example .env || true
	docker compose up --build -d
	@echo "⏳ Waiting for DB to be ready..."
	sleep 5
	docker compose exec backend alembic upgrade head
	@echo "✅ Setup complete — visit http://localhost"
