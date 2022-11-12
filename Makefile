SHELL := /bin/bash

## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

## deps: install the dependencies
.PHONY: deps
deps:
	@pnpm install

## dev: run the app in dev mode
.PHONY: dev
dev:
	@pnpm dev

## test: run the tests
.PHONY: test
test:
	@pnpm test
