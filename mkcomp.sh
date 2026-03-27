#!/bin/bash

# mkcomp - React TypeScript Component Scaffolder
# Creates React components following your project's patterns
function mkcomp() {
    # Validate input
    if [ -z "$1" ]; then
        echo "❌ Error: Component name is required"
        echo "Usage: mkcomp ComponentName"
        return 1
    fi

    local component_name="$1"
    
    # Validate component name format (PascalCase)
    if [[ ! "$component_name" =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
        echo "❌ Error: Component name must be in PascalCase (e.g., MyComponent)"
        return 1
    fi

    # Detect project root and component directory
    local project_root=""
    local current_dir="$(pwd)"
    
    # Look for TypeSurvivor project root
    while [[ "$current_dir" != "/" ]]; do
        if [[ -f "$current_dir/package.json" ]] && [[ -d "$current_dir/app" ]]; then
            project_root="$current_dir"
            break
        fi
        current_dir="$(dirname "$current_dir")"
    done
    
    if [[ -z "$project_root" ]]; then
        echo "❌ Error: Not in a TypeSurvivor project directory"
        echo "Please run this command from within your TypeSurvivor project"
        return 1
    fi

    # Auto-detect current feature directory
    local feature_dir=""
    local components_dir=""
    local relative_path="$(realpath --relative-to="$project_root" "$(pwd)" 2>/dev/null || echo "$(pwd)" | sed "s|^$project_root/||")"
    
    if [[ "$relative_path" =~ ^app/([^/]+) ]]; then
        feature_dir="${BASH_REMATCH[1]}"
        components_dir="$project_root/app/$feature_dir/components"
    else
        echo "❌ Error: Please run mkcomp from within an app/[feature] directory"
        echo "Example: cd app/game && mkcomp MyComponent"
        return 1
    fi

    # Check if component already exists
    local tsx_file="$components_dir/${component_name}.tsx"
    local css_file="$components_dir/${component_name}.module.css"
    
    if [[ -f "$tsx_file" ]]; then
        echo "❌ Error: Component '$component_name' already exists at $tsx_file"
        return 1
    fi

    # Create components directory if it doesn't exist
    mkdir -p "$components_dir"

    # Generate TypeScript component file
    cat > "$tsx_file" << EOF
'use client'

interface ${component_name}Props {
    // Add your props here
}

export function ${component_name}({}: ${component_name}Props) {
    return (
        <div className={styles.container}>
            <h1>${component_name}</h1>
        </div>
    )
}
EOF

    # Generate CSS module file
    cat > "$css_file" << EOF
.container {
    /* Add your styles here */
}
EOF

    # Success message
    echo "✅ Component created successfully!"
    echo "📁 Location: app/$feature_dir/components/"
    echo "📄 Files created:"
    echo "   - ${component_name}.tsx"
    echo "   - ${component_name}.module.css"
    echo ""
    echo "🚨 Don't forget to:"
    echo "   1. Import styles: import styles from './${component_name}.module.css'"
    echo "   2. Add your component props to the interface"
    echo "   3. Import and use in your parent component"
}

# Export the function for shell usage
export -f mkcomp