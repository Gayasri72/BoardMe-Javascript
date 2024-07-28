import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";


export default function MyViva() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address|| !formData.phone || !formData.age) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
     
      const res = await fetch("/api/viva/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
         
          </Link>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your address" />
              <TextInput
                type="text"
                placeholder="address"
                id="address"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="phone" />
              <TextInput
                type="text"
                placeholder="077...."
                id="phone"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your age" />
              <TextInput
                type="text"
                placeholder="age"
                id="age"
                onChange={handleChange}
              />
            </div>
          
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "submit"
              )}
            </Button>
           
          </form>
       
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
