include .env

compose-build:
	docker-compose -f docker-compose.dev.yml up
compose-down:
	docker-compose -f docker-compose.dev.yml down
db-login:
	docker exec -it ${DB_DOCKER_CONTAINER} bash && psql && \connect ${DB_NAME}
	psql
	\connect ${DB_NAME}
createdb:
	docker exec -it ${DB_DOCKER_CONTAINER} createdb --username=${DB_USER} --owner=${DB_USER} ${DB_NAME}
dropdb:
	docker exec -it ${DB_DOCKER_CONTAINER} dropdb ${DB_NAME}

migrate:
	pnpm prisma generate
	pnpm prisma db push