MOCHA_OPTS= --check-leaks --recursive -t 3s
REPORTER = dot

check: test-unit

test: test-unit test-acceptance

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-acceptance:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--bail \
		test/acceptance/*.js

.PHONY: test test-unit 
