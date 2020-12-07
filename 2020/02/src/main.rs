extern crate regex;

use std::fs;
use regex::Regex;

fn main() {
    let input: Vec<String> = fs::read_to_string("input.txt").expect("Can't find input.txt!")
        .lines()
        .map(|s| s.parse().expect("Error parsing!"))
        .collect();

    let passwords: Vec<Password> = parse_passwords(input.clone());
    let valid_passwords: Vec<Password> = passwords.into_iter().filter(|password| password.valid()).collect();
    println!("Part 1: In total {} passwords are valid", valid_passwords.len());

    let passwords: Vec<Password> = parse_passwords(input.clone());
    let valid_passwords: Vec<Password> = passwords.into_iter().filter(|password| password.valid2()).collect();
    println!("Part 2: In total {} passwords are valid", valid_passwords.len());
}

pub fn parse_passwords(database_rows: Vec<String>) -> Vec<Password> {
    let re = Regex::new(r"(?x)
        (?P<minimum>\d+)
        -
        (?P<maximum>\d+)
        \s
        (?P<character>\w+)
        :\s
        (?P<password>.*)
    ").unwrap();

    let mut passwords: Vec<Password> = Vec::new();
    for row in database_rows {
        let parsed_row = re.captures(&row).unwrap();
        passwords.push(Password{
            minimum: parsed_row["minimum"].parse().expect("Error with minimum"),
            maximum: parsed_row["maximum"].parse().expect("Error with maximum"),
            character: parsed_row["character"].parse().expect("Error with character"),
            password: parsed_row["password"].parse().expect("Error with password"),
        })
    }

    return passwords
}

pub struct Password {
    minimum: usize, // Aka Pos 1 
    maximum: usize, // Aka Pos 2
    character: char,
    password: String,
}

impl Password {
    pub fn valid(&self) -> bool {
        let count = self.password.chars()
            .filter(|&c| c == self.character)
            .collect::<Vec<char>>()
            .len();

        return count >= self.minimum && count <= self.maximum;
    }

    pub fn valid2(&self) -> bool {
        let chars = self.password.chars().into_iter().collect::<Vec<char>>();
        let position1 = chars[self.minimum-1];
        let position2 = chars[self.maximum-1];
        return position1 == self.character && position2 != self.character
            || position2 == self.character && position1 != self.character;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_password_format() {
        let test_data: Vec<String> =
            "1-3 a: abcde
            1-3 b: cdefg
            2-9 c: ccccccccc"
        .lines()
        .map(|s| s.trim().parse().expect("parse error"))
        .collect();

        let parsed_test_data = parse_passwords(test_data);

        assert_eq!(parsed_test_data[0].minimum, 1);
        assert_eq!(parsed_test_data[0].maximum, 3);
        assert_eq!(parsed_test_data[1].character, 'b');
        assert_eq!(parsed_test_data[2].password, "ccccccccc");
    }

    #[test]
    fn detects_invalid_password() {
        let invalid_password = Password {
            minimum: 1,
            maximum: 3,
            character: 'b',
            password: "cdefg".to_string(),
        };
        assert_eq!(invalid_password.valid(), false);
    }

    #[test]
    fn detects_valid_password() {
        let valid_password = Password {
            minimum: 2,
            maximum: 9,
            character: 'c',
            password: "ccccccccc".to_string(),
        };
        assert_eq!(valid_password.valid(), true);
    }

    #[test]
    fn detects_invalid_password_v2() {
        let invalid_password1 = Password {
            minimum: 1,
            maximum: 3,
            character: 'b',
            password: "cdefg".to_string(),
        };

        let invalid_password2 = Password {
            minimum: 2,
            maximum: 9,
            character: 'c',
            password: "ccccccccc".to_string(),
        };

        assert_eq!(invalid_password1.valid2(), false);
        assert_eq!(invalid_password2.valid2(), false);
    }

    #[test]
    fn detects_valid_password_v2() {
        let valid_password = Password {
            minimum: 1,
            maximum: 3,
            character: 'a',
            password: "abcde".to_string(),
        };
        assert_eq!(valid_password.valid2(), true);
    }

}
