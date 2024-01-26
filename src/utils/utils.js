export function createValidator(pattern, message) {
    return {
        pattern,
        message,
    };
}

const firstNamePattern = /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ]*$/;
const firstNameMessage = 'Будь ласка, введіть валідне ім\'я';
export const firstNameValidator = createValidator(firstNamePattern, firstNameMessage);

const lastNamePattern = /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ]*$/;
const lastNameMessage = 'Будь ласка, введіть валідне прізвище';
export const lastNameValidator = createValidator(lastNamePattern, lastNameMessage);

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailMessage = 'Будь ласка, введіть валідний email';
export const emailValidator = createValidator(emailPattern, emailMessage);

export function getCombinedTablesInfo(diningTables) {
    const combinedTables = diningTables.reduce((acc, table) => {
        const existingTable = acc.find((t) => t.capacity === table.capacity);

        if (existingTable) {
            existingTable.count += 1;
        } else {
            acc.push({ capacity: table.capacity, count: 1 });
        }

        return acc;
    }, []);

    return combinedTables.map((table) => (
        <div key={table.capacity} className="dining-table-item">
            {`${table.count} ${table.count === 1 ? 'стіл' : 'столів'} для ${table.capacity} людей`}
        </div>
    ));
}

export function passwordValidator(rule, value, callback) {
    const errors = [];

    if (value.length < 8) {
        errors.push('Пароль повинен містити мінімум 8 символів');
    }

    if (!/[A-Z]/.test(value)) {
        errors.push('Пароль повинен містити як мінімум одну велику літеру');
    }

    if (!/[a-z]/.test(value)) {
        errors.push('Пароль повинен містити як мінімум одну малу літеру');
    }

    if (!/[0-9]/.test(value)) {
        errors.push('Пароль повинен містити як мінімум одну цифру');
    }

    if (errors.length > 0) {
        callback(errors);
    } else {
        callback();
    }
}